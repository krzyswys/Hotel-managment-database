const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    country : {
        type: String,
        required: true,
        index: true
    },
    city : {
        type: String,
        required: true,
        index: true
    },
    street : {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
        index: true
    },
    apartmentAddres : {
        type: String
    }
})

const Address = mongoose.model('Address', addressSchema)
module.exports = Address