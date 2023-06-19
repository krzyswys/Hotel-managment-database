const mongoose = require('mongoose')
const { Hotel } = require('models')


module.exports = {
    addHotel: async (hotelId,internalNumber,floorNumber, beds, conveniences, photos, pricePerDay,logs = true) => {
        const requiredFields = [
            { field: hotelId, name: 'hotelId' },
            { field: internalNumber, name: 'internalNumber' },
            { field: floorNumber, name: 'floorNumber' },
            { field: beds, name: 'beds' },
            { field: conveniences, name: 'conveniences' },
            { field: photos, name: 'photos' },
            { field: reservations, name: 'reservations' },
            { field: pricePerDay, name: 'pricePerDay' },
            { field: logs, name: 'logs' }
        ];
        
        const emptyFields = requiredFields.filter(field => !field.field);
    
        if (emptyFields.length > 0) {
            const missingFieldNames = emptyFields.map(field => field.name).join(', ');
            throw new Error(`Missing required fields: ${missingFieldNames}`);
        }
    

        hotelId = typeof hotelId == 'string'
            ? new mongoose.Types.ObjectId(hotelId)
            : hotelId

        const hotelExists = await Hotel.exists({
            _id: hotelId
        })
            
        if (!hotelExists) 
                throw new Error(`Hotel with id ${hotelId} doesn't exists`)


        const hotel = await Hotel.findOne({
                    _id: hotelId
                })
        hotel.rooms.push({
            internalNumber,
            floorNumber,
            beds,
            conveniences,
            photos,
            reservations: [],
            pricePerDay,
        })

        await hotel.save();;

        if (logs)
            console.log(`created new room: ${internalNumber} in hotel: ${hotelId}`)
        
    }
}