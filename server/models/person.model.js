const mongoose = require('mongoose');
const { addressSchema } = require('../schemas');

const personSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthdate : {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: addressSchema,
        required: true
    }
},{
    timestamps: true,
});


/**
 * @typedef Person
 */
const Person = mongoose.model('Person', personSchema);

module.exports = Person;