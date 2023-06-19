const mongoose = require('mongoose')
const { Person } = require('models')

const personRoutes = app => {

    app.get("/person/:personId", async (req, res) => {
        const {personId} = req.params
        try{
            const person = await Person.findOne({
                _id: new mongoose.Types.ObjectId(personId)
            })
            res.json({person})

        }catch (err){
            res.status(500).json({ error: 'Couldnt find person of id ', personId });
            res.json({})
        }

    })



    app.get("/persons", async (req, res) => {
        const persons = await Person.find({})
        res.json({persons})
    })
}

module.exports = personRoutes