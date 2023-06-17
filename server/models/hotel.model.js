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

async function addHotel(hotelData) {
    try {
      const hotel = new Hotel(hotelData);
      const savedHotel = await hotel.save();
      return savedHotel;
    } catch (error) {
      throw new Error(error);
    }
  }
 
  async function deleteHotel(hotelId) {
    try {
      const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
      return deletedHotel;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateHotel(hotelId, hotelData) {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, hotelData, { new: true });
      return updatedHotel;
    } catch (error) {
      throw new Error(error);
    }
  }
  