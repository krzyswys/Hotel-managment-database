const mongoose = require('mongoose')

const sessionRoutes = app => {
    
    app.post("/login", (req, res) => {
        res.json({path: "login"})
    })

    app.post("/register", (req, res) => {
        res.json({path: "register"})
    })
    
    app.get("/logout", (req, res) => {
        res.json({path: "logout"})
    })

    app.get("/refresh", (req, res) => {
        res.json({path: "refresh"})
    })
}

module.exports = sessionRoutes