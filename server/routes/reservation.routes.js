const mongoose = require('mongoose')

const reservationRoutes = app => {
    app.get("/reservations", (req, res) => {
        console.log(
            "siema"
        )
        res.json({})
    })

    app.get("/reservation/:id", (req, res) => {
        res.json({hotelId: req.params.id})
    })
}

module.exports = reservationRoutes