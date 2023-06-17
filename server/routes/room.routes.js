const mongoose = require('mongoose')
const { Hotel } = require('models')

const roomRoutes = app => {
    //// TODO: finish it
    app.post("/hotel/:hotelId/room", (req, res) => {
        const { hotelId } = req.params

        //// VALIDATE ROOM ////

        res.json({})
    })

    //// TODO: finish it
    app.post("/hotel/:hotelId/rooms", (req, res) => {

        //// VALIDATE INPUT ////

        res.json({ok: true})
    })

    //// TODO: finish it
    app.get("/hotel/:hotelId/room/:roomId", async (req, res) => {
        const { hotelId, roomId } = req.params
        
        const room = await Hotel.findOne({})

        const hotels = await Hotel.find({}, {rooms: 0})
        
        res.json({hotels})
    })
}

module.exports = roomRoutes