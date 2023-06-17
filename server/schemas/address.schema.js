const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    country: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    street: { 
        type: String, 
        required: true 
    },
    houseNumber: { 
        type: String, 
        required: true 
    },
    flatNumber: { 
        type: String, 
        required: false 
    },
    postalCode: { 
        type: String, 
        required: true 
    }
},{
    autoCreate: false,
    _id: false
})

module.exports = addressSchema