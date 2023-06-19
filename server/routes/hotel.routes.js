const mongoose = require('mongoose')
const { Hotel } = require('models')
const { addHotel } = require('procedures/hotel.proc')


const hotelRoutes = app => {

    //// TODO: finish it
    app.post("/hotel", async (req, res) => {
        const {
            name, 
            address, 
            phone,
            email,
            photos,
            description
        } = req.body

        try {
            await addHotel(name,address, phone, email, photos, description)
            res.json({status: "ok"})
        } catch (error) {
            console.error(error)            
            res.status(400).json({error})
        }
    })
    app.get("/hotel/:hotelId", async (req, res) => {

        const { hotelId } = req.params;
    
        try {
            const hotel = await Hotel.findOne({
                _id: new mongoose.Types.ObjectId(hotelId)
            }).populate({
                path: 'rooms.reservations.personId',
                select: 'name'
            }).populate({
                path: 'rooms.reservations.review',
                select: 'content stars createdAt'
            });
    
            if (!hotel) {
                return res.status(404).json({ error: 'Hotel not found' });
            }

            const reviews = hotel.rooms.reduce((acc, room) => {
                const roomReviews = room.reservations.reduce((roomAcc, reservation) => {
                    if (reservation.review && reservation.review.content && reservation.review.stars) {
                        roomAcc.push({
                            name: reservation.personId.name,
                            content: reservation.review.content,
                            stars: reservation.review.stars,
                            createdAt: reservation.review.createdAt
                        });
                    }
                    return roomAcc;
                }, []);
    
                return acc.concat(roomReviews);
            }, []);
    
            let totalStars = 0;
            let totalReviews = 0;
    
            hotel.rooms.forEach(room => {
                room.reservations.forEach(reservation => {
                    if (reservation.review && reservation.review.stars) {
                        totalStars += reservation.review.stars;
                        totalReviews++;
                    }
                });
            });
            const averageRating = Math.round((totalReviews > 0 ? totalStars / totalReviews : 0)*10)/10;
    
            res.json({
                hotel,
                averageRating,
                reviews
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    

    app.get("/hotels", async (req, res) => {       
        try {
            const hotels = await Hotel.find({});
            const hotelList = [];

            for (const hotel of hotels) {
                let totalStars = 0;
                let totalReviews = 0;
                const conveniences = {
                    smoking: false,
                    pets: false,
                    children: false,
                    airConditioning: false,
                    kitchen: false,
                    balcony: false,
                    elevator: false,
                    restaurant: false,
                    wifi: false,
                    parking: false,
                    inclusiveMeals: false,
                };
        
                for (const room of hotel.rooms) {
                    for (const reservation of room.reservations) {
                        if (reservation.review && reservation.review.stars) {
                            totalStars += reservation.review.stars;
                            totalReviews++;
                        }
                    }
                    
                    for (let key in room.conveniences) {
                        if (room.conveniences[key])
                            conveniences[key] = true
                    }
                }
        
                const avgRating = Math.round((totalReviews !== 0 ? totalStars / totalReviews : 0)*10)/10;
                hotelList.push({
                    ...hotel._doc,
                    conveniences,
                    avgrating: avgRating,
                });
            }
        
            res.json({ hotels: hotelList });
            } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
            }
        });
      
    
      
}

module.exports = hotelRoutes