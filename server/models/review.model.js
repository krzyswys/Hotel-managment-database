const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    rating:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: false
    },
 
    dateOfPost:{
        type: Date,
        required: true
    },

    // PersonID,RoomID,ReviewID ?
  },
  {
    timestamps: true,
  }
);



/**
 * @typedef Review
 */
const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;