const mongoose = require('mongoose')
const { Hotel } = require('models')

const hotelRoutes = app => {

    //// TODO: finish it
    app.post("/hotel", (req, res) => {

        //// VALIDATE INPUT ////

        res.json({ok: true})
    })

    //// TODO: finish it
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
    
            const averageRating = totalReviews > 0 ? totalStars / totalReviews : 0;
    
            res.json({
                hotel,
                averageRating,
                reviews
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    

    //// TODO: finish it:
    app.get("/hotels", async (req, res) => {
        try {
          const hotels = await Hotel.find({}, { });
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
      
              if (room.conveniences.wifi) {
                conveniences.wifi = true;
              }
      
              if (room.conveniences.kitchen) {
                conveniences.kitchen = true;
              }
      
              if (room.conveniences.smoking) {
                conveniences.smoking = true;
              }
      
              if (room.conveniences.pets) {
                conveniences.pets = true;
              }
      
              if (room.conveniences.children) {
                conveniences.children = true;
              }
      
              if (room.conveniences.airConditioning) {
                conveniences.airConditioning = true;
              }
      
              if (room.conveniences.balcony) {
                conveniences.balcony = true;
              }
      
              if (room.conveniences.elevator) {
                conveniences.elevator = true;
              }
      
              if (room.conveniences.restaurant) {
                conveniences.restaurant = true;
              }
      
              if (room.conveniences.parking) {
                conveniences.parking = true;
              }
      
              if (room.conveniences.inclusiveMeals) {
                conveniences.inclusiveMeals = true;
              }
            }
      
            const avgRating = totalReviews !== 0 ? totalStars / totalReviews : 0;
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