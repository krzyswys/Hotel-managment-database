const mongoose = require('mongoose')
const { addRoomReservation } = require('procedures/reservation.proc')
const { getPersonReservations, getHotelReservations } = require('../functions/index');
const Hotel = require('../models/hotel.model')


const reservationRoutes = app => {
    
    app.post("/reservation", async (req, res) => {        
        const {
            startDate, 
            dueDate, 
            roomId, 
            personId
        } = req.body

        try {
            if (!roomId)
                throw new Error('Pass roomId')
            if (!personId)
                throw new Error('Pass personId')

            await addRoomReservation(personId, roomId, {
                startDate,
                dueDate
            })
            res.json({status: "ok"})
        } catch (error) {
            console.error(error)            
            res.status(400).json({error})
        }
    })

    //// TODO: test it
    app.get("/hotel/:hotelId/reservations", async (req, res) => {
        try {
          const hotelId = req.params.hotelId;
          const reservations = await getHotelReservations(hotelId);
          res.json(reservations);
        } catch (error) {
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
      

    //// TODO: test it
    app.get("/reservations", async (req, res) => {
        try {
          const hotels = await Hotel.find().exec();
          const reservations = [];
      
          hotels.forEach(hotel => {
            hotel.rooms.forEach(room => {
              room.reservations.forEach(reservation => {
                reservations.push(reservation);
              });
            });
          });
      
          res.json(reservations);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

      //// TODO: test it
    app.get("/person/:personId/reservations", async (req, res) => {
        try {
            const personId = req.params.personId;
            const reservations = await getPersonReservations(personId);
            res.json(reservations);
          } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
          }
        });

   //// TODO: test it
    app.get("/reservation/:reservationId", async (req, res) => {
        const reservationId = req.params.reservationId;
      
        try {
          const hotels = await Hotel.find().exec();
          let foundReservation = null;
      
          hotels.forEach(hotel => {
            hotel.rooms.forEach(room => {
              const reservation = room.reservations.find(reservation => reservation._id.toString() === reservationId);
              if (reservation) {
                foundReservation = reservation;
                return; 
              }
            });
      
            if (foundReservation) {
              return; 
            }
          });
      
          if (foundReservation) {
            res.json(foundReservation);
          } else {
            res.status(404).json({ error: 'Rezerwacja nie została znaleziona' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
}

module.exports = reservationRoutes