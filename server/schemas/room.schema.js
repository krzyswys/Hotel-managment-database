const mongoose = require('mongoose')
const reservationSchema = require('./reservation.schema')

const roomSchema = mongoose.Schema({
    internalNumber: {
        type: Number,
        required: true
    },
    floorNumber : {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    conveniences: {
        wifi: Boolean,
        kitchen: Boolean,
        smoking: Boolean,
        pets: Boolean,
        children: Boolean,
        balcony: Boolean,
        elevator: Boolean,
        restaurant: Boolean,
        parking: Boolean,
        invlusiveMeals: Boolean
    },
    photos: {
        type: [{type: String}]
    },
    reservations : {
        type: [reservationSchema]
    },
    pricePerDay: {
        type: Number,
        required: true
    }
})

module.exports = roomSchema