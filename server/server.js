const mongoose = require('mongoose')

const models = require('models')

const express = require('express')
const app     = express()
const PORT    = process.env.PORT ?? 3000

const routes = require('routes')
const utils = require('utils')

//// SETUP ROUTES ////

routes.hotel(app)
routes.person(app)
routes.session(app)
routes.reservation(app)

//// SETUP SERVER WITH DATABASE ////

utils.connect(() => {
    //// LISTENER ////
    app.listen(PORT, () => {
        console.log(`server started @ http://localhost:${PORT}`)
    })
})

app.get("/", (req, res) => {
    res.send("Server works!")
})
