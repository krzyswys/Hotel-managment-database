const mongoose = require('mongoose')
const { Person } = require('models')
const { checkEmployeePositionById } = require('procedures/employee.proc')

const sessionRoutes = app => {
    
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

            console.log({personId: user._id,
                name: user.firstname})


            res.json({personId: user._id,
            name: user.firstname,
        validation: true})
        } catch (error) {
            console.log(error.message)
            res.status(400).json({error: error.message, 
            validation: false})
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
                password,
            })

            await newPerson.save()
            res.json({validation: 'true', personId: newPerson._id, name: newPerson.firstname})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    })
    app.post("/registerEmployee", async (req, res) => {
        const { 
            firstname, 
            lastname, 
            birthdate,
            email,
            phone,
            address,
            password,
            position,
            salary
        } = req.body 
        
        //// VALIDATE DATE ////

        try {
            const newEmployee = await new Employee({
                firstname,
                lastname,
                birthdate,
                email,
                phone,
                address,
                password,
                position,
                salary
            })

            await newEmployee.save()
            res.json({validation: 'true', personId: newEmployee._id, name: newEmployee.firstname})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    })
    app.get("/checkRegisterEmployee/:personId", async (req, res) => {       
            const {personId} = req.params
            const value = await checkEmployeePositionById(personId)
            res.json({value})
        })
    
}

module.exports = sessionRoutes