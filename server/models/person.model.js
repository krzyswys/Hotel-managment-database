const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    
    //// FOREIGN KEYS ////
    
    address : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },

    //// STRUCTURE ////

    firstName : {
        type: String,
        required: true,
        index: true
    },
    lastName : {
        type: String,
        required: true,
        index: true
    },
    birthDate : {
        type: Date,
        required: true,
    },
    phone : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique: true
    }
},{
    timestamps: true,
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person