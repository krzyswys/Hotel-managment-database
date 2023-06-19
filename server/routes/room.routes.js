const mongoose = require('mongoose')
const { Hotel } = require('models')
const { getAvailableRooms } = require('functions')
const { getConveniences } = require('utils/general')

const roomRoutes = app => {
    //// TODO: finish it
    app.post("/hotel/:hotelId/room", (req, res) => {
        const { hotelId } = req.params

        //// VALIDATE ROOM ////

        res.json({})
    })

    app.get("/hotel/:hotelId/rooms", async (req, res) => {

        const { hotelId } = req.params
        const conveniences = getConveniences(req.query)
        
        let { startDate, dueDate } = req.query

        startDate = startDate ? new Date(req.query.startDate) : undefined
        dueDate = dueDate ? new Date(req.query.dueDate) : undefined

        try {
            const rooms = await getAvailableRooms(hotelId, startDate, dueDate ?? 0, conveniences)

            res.json({hotelId, rooms})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    })


    app.get("/hotel/:hotelId/room/:roomId", async (req, res) => {
        const { hotelId, roomId } = req.params
        
        try {
            const hotel = await Hotel.findOne({
                _id: new mongoose.Types.ObjectId(hotelId)
            }, {
                "rooms.reservations": 0
            })
            
            if (!hotel)
                throw new Error("Hotel not found")
    
            const room = hotel.rooms.id(
                new mongoose.Types.ObjectId(roomId)
            )
            
            res.json({room})

        } catch (error) {
            res.status(400).json({error: error.message})
        }
    })
}

module.exports = roomRoutes