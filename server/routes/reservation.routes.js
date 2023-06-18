const mongoose = require('mongoose')
const { addRoomReservation } = require('../procedures/reservation.proc')

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

    //// TODO: finish it
    app.get("/hotel/:hotelId/reservations", (req, res) => {

        res.json({})
    })

    //// TODO: finish it
    app.get("/reservations", (req, res) => {

        res.json({})
    })

    //// TODO: finish it
    app.get("/person/:personId/reservations", (req, res) => {
        
        res.json({})
    })

    //// TODO: finish it
    app.get("/reservation/:reservationId", (req, res) => {
        res.json({reservationId: req.params.reservationId})
    })
}

module.exports = reservationRoutes