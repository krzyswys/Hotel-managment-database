const mongoose = require('mongoose')

const reservationRoutes = app => {
    //// TODO: finish it
    app.post("/hotel/:hotelId/room/:roomId/reservation", (req, res) => {
        
        res.json({})
    })

    //// TODO: finish it
    app.post("/hotel/:hotelId/reservations", (req, res) => {

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