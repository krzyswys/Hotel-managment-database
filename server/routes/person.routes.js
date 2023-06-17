const mongoose = require('mongoose')

const peronRoutes = app => {
    //// TODO: finish it
    app.get("/person/:personId", (req, res) => {
        const {personId} = req.params

        res.json({personId})
    })

    //// TODO: finish it
    app.post("/person", (req, res) => {
        res.json({})
    })
}

module.exports = peronRoutes