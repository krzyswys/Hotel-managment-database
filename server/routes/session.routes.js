const mongoose = require('mongoose')
const { Person } = require('models')

const sessionRoutes = app => {
    
    //// TODO: finish it
    app.post("/login", async (req, res) => {
        const { email, password } = req.body
        console.log(req.body)
        try {
            if (!email)
                throw new Error("Pass email first!")

            if (!password)
                throw new Error("Pass password first!")

            const user = await Person.findOne({email})
            
            if (!user)
                throw new Error("User not found")

            if (user.password != password)
                throw new Error("Invalid password")

            res.json({personId: user._id})
        } catch (error) {
            console.log(error.message)
            res.status(400).json({error: error.message})
        }

    })

    //// TODO: finish it
    app.post("/register", async (req, res) => {
        const { 
            firstname, 
            lastname, 
            birthdate,
            email,
            phone,
            address,
            password 
        } = req.body 
        
        //// VALIDATE DATE ////

        try {
            const newPerson = await new Person({
                firstname,
                lastname,
                birthdate,
                email,
                phone,
                address,
                password
            })

            await newPerson.save()
            res.json({status: "ok", personId: newPerson._id})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    })
    
}

module.exports = sessionRoutes