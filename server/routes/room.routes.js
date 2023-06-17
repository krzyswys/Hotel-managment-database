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
    app.get("/hotel/:hotelId/rooms", async (req, res) => {

        const { hotelId } = req.params

        if (!hotelId)
            res.json({error: "hotelId not passed"})

        //// VALIDATE INPUT ////
        
        const rooms = await Hotel.findOne({
            _id: hotelId
        }, {
            _id: 0, 
            rooms: 1
        })

        res.json(rooms)
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