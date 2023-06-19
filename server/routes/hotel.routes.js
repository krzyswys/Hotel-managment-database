const mongoose = require('mongoose')
const { Hotel } = require('models')
const { getAvailableRooms, fuzzySearchHotel } = require('functions')
const { getConveniences } = require('utils/general')

const hotelRoutes = app => {

    //// TODO: finish it
    app.post("/hotel", (req, res) => {

        //// VALIDATE INPUT ////

        res.json({ok: true})
    })

    app.get("/hotel/:hotelId", async (req, res) => {

        const { hotelId } = req.params;
        const { startDate, dueDate } = req.query

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

            hotel.rooms = await getAvailableRooms(hotelId, startDate, dueDate, getConveniences(req.query) )
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

        let { startDate, dueDate, capacity, search } = req.query

        startDate = startDate ? new Date(req.query.startDate) : undefined
        dueDate = dueDate ? new Date(req.query.dueDate) : undefined
        search = search || ""

        try {
            const hotels = fuzzySearchHotel(await Hotel.find({}), search);
            const hotelList = [];

            for (const hotel of hotels) {
                if ( (await getAvailableRooms(
                    hotel._id, 
                    startDate, 
                    dueDate, 
                    getConveniences(req.query)
                )).length == 0 ) {
                    continue
                }

                const maxAvailableCapacity = hotel.rooms.reduce( (acc, room) => acc + room.maxCapacity, 0)

                if ( maxAvailableCapacity < capacity ) {
                    continue
                }

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
                    
                    for (let key in conveniences) {
                        if (room.conveniences[key])
                            conveniences[key] = true
                    }
                    room.reservations = undefined
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
                res.status(400).json({ error: error.message });
            }
        });
      
    
      
}

module.exports = hotelRoutes