const mongoose = require('mongoose')
const { Hotel } = require('models')

module.exports = {
    getPersonReservations: personId => {

    },

    getPersonReservation: personId => {

    },

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