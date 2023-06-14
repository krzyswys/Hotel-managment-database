const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema(
  {
    hotelName:{
        type: String,
        required: true
    },
    nip:{
        type: Number,
        required: true
    },
    buildDate:{
        type: Date,
        required: true
    },
    localization:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    numberOfRooms: {
        type: Number,
        required: true
    },
    numberOfCustomers:{
        type: Number,
        required: true
    },
    dining:{
        type: Boolean,
        required: false
        },
    elevator:{
        // type: Boolean,
        type: List,
        required: false
        },
    parkingPlace:{
        type: Boolean,
        required: false
    },
    wifi:{
        type: Boolean, 
        required: false
    },
    restaturant:{
        type: Boolean, 
        required: false
    },
    kitchen:{
        type: Boolean, 
        required: false
    },
    livingRoom:{
        type: Boolean, 
        required: false
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    // AdressID, HotrelID, ReviewID ?
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