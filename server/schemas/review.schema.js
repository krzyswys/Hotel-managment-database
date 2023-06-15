const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    content : {
        type: String,
        required: false
    },
    stars : {
        type: Number,
        required: false
    }
},{
    timestamps: true
})

module.exports = reviewSchema