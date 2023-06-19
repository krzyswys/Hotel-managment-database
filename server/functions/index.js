const mongoose = require('mongoose')
const { Hotel } = require('models')
// const Hotel = require('../models/hotel.model')

async function getPersonReservations(personId) {
    try {
        const hotels = await Hotel.find();
        const personReservations = [];
    
        for (const hotel of hotels) {
          for (const room of hotel.rooms) {
            for (const reservation of room.reservations) {
              if (reservation.personId.toString() === personId.toString()) {
                personReservations.push(reservation);
              }
            }
          }
        }
    
        return personReservations;
      } catch (error) {
        console.error('Error retrieving person reservations:', error);
        throw error;
      }
   
    }
    async function getHotelReservations(hotelId) {
        try {
          const hotel = await Hotel.findById(hotelId);
          const hotelReservations = [];
      
          for (const room of hotel.rooms) {
            for (const reservation of room.reservations) {
              hotelReservations.push(reservation);
            }
          }
      
          return hotelReservations;
        } catch (error) {
          console.error('Error retrieving hotel reservations:', error);
          throw error;
        }
      }
    // Example call  
    //   const personId = '648f847f2277ea016d7c1b78'; // ID osoby, dla której chcesz pobrać rezerwacje
    //   getPersonReservations(personId)
    //   .then((reservations) => {
    //       console.log('Person reservations:', reservations);
    //   })
    //   .catch((error) => {
    //       console.error('Error retrieving person reservations:', error);
    //   });


module.exports = {
    getPersonReservations,

    getHotelReservations,
    getEmployeeTasks: employeeId => {

    },
    getOverlappingRoomIds: async (hotelId, startDate, endDate) => {
        hotelId = typeof hotelId == 'string' 
            ? new mongoose.Types.ObjectId(hotelId) 
            : hotelId
        
        const hotel = await Hotel.findOne({
            _id: hotelId
        })

        if (!hotel)
            throw new Error('Hotel not found')

        const rooms = await Hotel.aggregate([{
            $match : {_id: new mongoose.Types.ObjectId(hotelId)}
        },{
            $unwind : "$rooms"
        }, {
            $unwind : "$rooms.reservations"
        },{
            $match: {
                $expr : {
                    $and: [
                        { $lte: ["$rooms.reservations.period.startDate", new Date(endDate)] },
                        { $gte: ["$rooms.reservations.period.dueDate", new Date(startDate)] },
                    ]
                }
            }
        },{
            $project : {
                _id: "$rooms._id",
                startDate: "$rooms.reservations.period.startDate",
                dueDate: "$rooms.reservations.period.dueDate",
            }
        }])

        return rooms.map(({_id}) => _id)
    },
    getAvailableRooms: async (hotelId, startDate, dueDate, conveniences) => {
        if (startDate && !dueDate || !startDate && dueDate )
            throw new Error('Pass startDate & dueDate')

        const rooms = await Hotel.aggregate([{
            $match : {_id: new mongoose.Types.ObjectId(hotelId)}
        },{
            $unwind : "$rooms"
        },{
            $match : {
                "rooms._id": {
                    $nin : await module.exports.getOverlappingRoomIds(hotelId, startDate, dueDate)
                },
            }
        },{
            $replaceRoot : { 
                newRoot: "$rooms"
            }
        },{
            $project: {
                reservations: false
            }
        }])

        return rooms.filter(room => {
            for (let key in conveniences) {
                if (!room.conveniences[key])
                    return false
            }
            return true
        })
    }
}