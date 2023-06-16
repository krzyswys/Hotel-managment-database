const mongoose = require('mongoose');
const { addressSchema, roomSchema } = require('schemas');

const hotelSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    rooms: {
        type: [roomSchema],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
},{
    timestamps: true,
});


/**
 * @typedef Hotel
 */
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
