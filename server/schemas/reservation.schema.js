const mongoose = require('mongoose')
const reviewSchema = require('./review.schema')

const reservationSchema = mongoose.Schema({
    personId : {
        type: mongoose.Types.ObjectId,
        required : true,
        index : true,
        ref: 'Person'
    },
    // Set only when reservation has 
    // been already paid
    paymentDate : {
        type: Date, 
        required: false
    },
    pricePerDay : {
        type: Number,
        required: true
    },
    period : {
        startDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
    },
    review : {
        type: reviewSchema,
        required: false
    }
})

module.exports = reservationSchema