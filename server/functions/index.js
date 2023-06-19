const mongoose = require('mongoose')
const Hotel = require('../models/hotel.model')

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

    }
}