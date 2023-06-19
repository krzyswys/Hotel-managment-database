const mongoose = require('mongoose')
const { Hotel } = require('models')
const { getOverlappingRoomIds } = require('functions')
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

            if (startDate && !dueDate || !startDate && dueDate )
                throw new Error('Pass startDate & dueDate')

            const rooms = await Hotel.aggregate([{
                $match : {_id: new mongoose.Types.ObjectId(hotelId)}
            },{
                $unwind : "$rooms"
            },{
                $match : {
                    "rooms._id": {
                        $nin : await getOverlappingRoomIds(hotelId, startDate, dueDate)
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

            
            res.json({hotelId, rooms: rooms.filter(room => {
                for (let key in conveniences) {
                    if (!room.conveniences[key])
                        return false
                }
                return true
            })})

        } catch (error) {
            res.status(400).json({error: error.message})
        }
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