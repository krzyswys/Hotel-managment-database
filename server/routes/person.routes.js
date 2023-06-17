const mongoose = require('mongoose')
const { Person } = require('models')

const personRoutes = app => {
    //// TODO: finish it
    app.get("/person/:personId", (req, res) => {
        const {personId} = req.params

        res.json({personId})
    })

    //// TODO: finish it
    app.post("/person", (req, res) => {
        res.json({})
    })

    app.get("/persons", async (req, res) => {
        const persons = await Person.find({})
        res.json({persons})
    })
}

module.exports = personRoutes