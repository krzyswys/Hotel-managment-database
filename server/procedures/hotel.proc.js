const mongoose = require('mongoose')

module.exports = {
    addHotel: async (name, address, phone, email, photos,logs = true) => {
        const requiredFields = [
            { field: name, name: 'name' },
            { field: address, name: 'address' },
            { field: phone, name: 'phone' },
            { field: email, name: 'email' },
            { field: photos, name: 'photos' }
        ];
    
        const emptyFields = requiredFields.filter(field => !field.field);
    
        if (emptyFields.length > 0) {
            const emptyFieldNames = emptyFields.map(field => field.name);
            throw new Error(`Empty fields: ${emptyFieldNames.join(', ')}`);
        }
        const hotel = new models.Hotel({
            name: name,
            address:address,
            rooms:[],
            phone:phone,
            email:email,
            photos:photos
        })

        await hotel.save();;

        if (logs)
            console.log(`created new hotel: ${name}, ${phone}, ${email}`)
        
    }
}