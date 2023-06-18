const mongoose = require('mongoose')
const { Hotel, Person } = require('models')
const { isRangesOverlaping } = require('utils/general')

module.exports = {
    addRoomReservation: async (personId, roomId, params, logs = true) => {
        if (!params.startDate) throw new Error("Pass startDate")
        if (!params.dueDate) throw new Error("Pass dueDate")

        const startDate = new Date(params.startDate)
        const dueDate = new Date(params.dueDate)

        personId = typeof personId == 'string'
            ? new mongoose.Types.ObjectId(personId)
            : personId

        roomId = typeof roomId == 'string'
            ? new mongoose.Types.ObjectId(roomId)
            : roomId

        //// VALIDATE IDS ////

        /// TODO: USE SESSION & TRANSACTION ///
        const personExists = await Person.exists({
            _id : personId
        })
        
        if (!personExists) 
            throw new Error(`Person with id ${personId} doesn't exists`)

        const roomExists = await Hotel.exists({
            "rooms._id" : roomId
        })
        
        if (!roomExists) 
            throw new Error(`Room with id ${roomId} doesn't exists`)

        //// CREATE NEW RESERVATION ////

        const hotel = await Hotel.findOne({"rooms._id": roomId})
        const room = hotel.rooms.id(roomId)

        //// VALIDATE DATE ////

        const isOverlaping = !!room.reservations.filter( ({period}) => isRangesOverlaping({
            start : period.startDate.getTime(),
            end   : period.dueDate.getTime()
        },{
            start : startDate.getTime(),
            end   : dueDate.getTime()
        })).length

        if (isOverlaping) {
            throw new Error('Reservation period overlaps with other reservations')
        }

        room.reservations.push({
            personId,
            review: params.review,
            pricePerDay: room.pricePerDay,
            period : {
                startDate,
                dueDate,
            },
        })
        
        await hotel.save()

        if (logs)
            console.log(`created new reservation for person ${personId} and room ${roomId}`)
        
    }
}