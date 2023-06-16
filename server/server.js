const mongoose = require('mongoose')

const models = require('models')

const express = require('express')
const app     = express()
const PORT    = process.env.PORT ?? 3000

console.log(models)

const db = mongoose.connect(
    process.env.MONGO_URL, {
    "auth": {
      "authSource": process.env.MONGO_ADMIN_USERNAME
    },
    "user": process.env.MONGO_USERNAME,
    "pass": process.env.MONGO_PASSWORD
  }
).then(() => console.log(`successfully connected to ${process.env.MONGO_URL}`))

app.get("/", (req, res) => {
    const userTest = new models.Person({firstName : "Test", lastName : "testowski", birthDate: new Date(), phone: "+48123456789", email: `example${Math.random()}@example.com`})
    userTest.save().then( () =>  {
        
        res.send("express server works!")
    }).catch(() => {
        res.send("unable to save model")
    })
})

//// HOTEL ////

app.get("/hotel/:id", (req, res) => {
    res.send(`/hotel/${req.params.id}`)
})

app.post("/hotel", (req, res) => {
    res.send("/hotel")
})

//// ROOM ////

app.get("/room/:id", (req, res) => {
    res.send(`/room/${req.params.id}`)
})

app.post("/room", (req, res) => {
    res.send("/room")
})

//// RESERVATIONS ////

app.get("/reservations", (req, res) => {
    res.send("/reservations")
})

app.get("/reservation/:id", (req, res) => {
    res.send(`/reservation/${req.params.id}`)
})

app.post("/reservation", (req, res) => {
    res.send(`/reservation`)
})


//// LISTENER ////

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})