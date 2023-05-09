const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    number:{
        type: Number,
        required: true
    },
    floor:{
        type: Number,
        required: true
    },
    numberOfPeople:{
        type: Number,
        required: true
    },
    numberOfGuests:{
        type: Number,
        required: true
    },
    numberOfBathrooms:{
        type: Number,
        required: true
    },
    availableForGuests:{
        type: Boolean,
        required: false
        },
    kitchen:{
        type: Boolean,
        required: false
        },
    balcony:{
        type: Boolean,
        required: false
    },
    smoking:{
        type: Boolean, 
        required: false
    },
    airConditioning:{
        type: Boolean, 
        required: false
    },
    petsAllowed:{
        type: Boolean, 
        required: false
    }
    // RoomId, HotelID?
  },
  {
    timestamps: true,
  }
);



/**
 * @typedef Room
 */
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;