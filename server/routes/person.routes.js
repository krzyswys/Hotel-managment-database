const mongoose = require('mongoose')

const peronRoutes = app => {
    app.get("/person/:personId", (req, res) => {
        const {personId} = req.params

        res.json({personId})
    })

    app.post("/person", (req, res) => {
        res.json({})
    })
}

module.exports = peronRoutes