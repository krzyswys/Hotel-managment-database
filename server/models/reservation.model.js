const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema(
  {
 
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    orderDate:{
        type: Date,
        required: true
    },
    paymentDate:{
        type: Date,
        required: true
    },
    
    // ReservationID,PersonID,RoomID,ReviewID ?
  },
  {
    timestamps: true,
  }
);



/**
 * @typedef Reservation
 */
const Reservation = mongoose.model('Reservation',reservationSchema);

module.exports = Reservation;