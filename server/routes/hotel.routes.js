const mongoose = require('mongoose')
const { Hotel } = require('models')

const hotelRoutes = app => {

    //// TODO: finish it
    app.post("/hotel", (req, res) => {

        //// VALIDATE INPUT ////

        res.json({ok: true})
    })

    //// TODO: finish it
    app.get("/hotel/:hotelId", async (req, res) => {
        const { hotelId } = req.params

        const hotel = await Hotel.findOne({
            _id: new mongoose.Types.ObjectId(hotelId) 
        }, {
            rooms : 0
        })

        res.json(hotel)
    })

    //// TODO: finish it
    app.get("/hotels", async (req, res) => {
        const hotels = await Hotel.find({}, {rooms: 0})
        
        res.json({hotels})
    })

}

module.exports = hotelRoutes