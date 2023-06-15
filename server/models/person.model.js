const mongoose = require('mongoose');

const personSchema = mongoose.Schema(
  {
    personType: {
        type: String,  // Enum?
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    adress: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        houseNumber: { type: Number, required: true },
        flatNumber: { type: Number, required: false },
        postalCode: { type: String, required: true },
    },
    reservations: [{
        hotelId: {
            type: ObjectId,
            required: true
        },
        hotelRoom: {
            type: Number,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        reservationDatetime: {
            type: Date,
            required: true
        },
        paymentDatetime: {
            type: Date,
            required: false
        }
    }]
  },
  {
    timestamps: true,
  }
);


/**
 * @typedef Person
 */
const Person = mongoose.model('Person', personSchema);

module.exports = Person;