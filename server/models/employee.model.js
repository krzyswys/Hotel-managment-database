const mongoose = require('mongoose')
const Person = require('./person.model')

const employeeSchema = mongoose.Schema({
    position : {
        type: String,
        required: true,
    },
    salary : {
        type: Number,
        required: true,
    },
})

const Employee =  Person.discriminator('Employee', employeeSchema)

module.exports = Employee