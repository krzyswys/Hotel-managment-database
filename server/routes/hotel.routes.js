const mongoose = require('mongoose')

const hotelRoutes = app => {
    app.get("/hotels", (req, res) => {
        res.json({})
    })

    app.get("/hotel/:id", (req, res) => {
        res.json({hotelId: req.params.id})
    })
}

module.exports = hotelRoutes