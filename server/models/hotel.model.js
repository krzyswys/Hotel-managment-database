const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema(
  {
    name: {
        type: String, 
        required: true
    },
    adress: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        houseNumber: { type: Number, required: true },
        flatNumber: { type: Number, required: false },
        postalCode: { type: String, required: true },
    },
    rooms: [{
        internal_number: { type: Number, required: true },
        floor_number: { type: Number, required: true },
        number_of_beds: { type: Number, required: true },
        conveniences: { 
            wifi: Boolean,
            kitchen: Boolean
        },
        reservations: [{
            PersonId: {
                type: ObjectId,
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
        }],
        reviews: [{
            PersonId: {
                type: ObjectId,
                required: true
            },
            ReviewDate: {
                type: Date,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            reviewContent: {
                type: String,
                required: true
            }
        }]
    }]
  },
  {
    timestamps: true,
  }
);


/**
 * @typedef Hotel
 */
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
