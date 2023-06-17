const mongoose = require('mongoose')

const sessionRoutes = app => {
    
    //// TODO: finish it
    app.post("/login", (req, res) => {
        res.json({path: "login"})
    })

    //// TODO: finish it
    app.post("/register", (req, res) => {
        res.json({path: "register"})
    })
    
    //// TODO: finish it
    app.get("/logout", (req, res) => {
        res.json({path: "logout"})
    })

    //// TODO: finish it
    app.get("/refresh", (req, res) => {
        res.json({path: "refresh"})
    })
}

module.exports = sessionRoutes