const mongoose = require('mongoose')

const express = require('express')
const app     = express()
const PORT    = process.env.PORT ?? 3000

app.get("/", (req, res) => {
    res.send("Witam serdecznie")
})

const db = mongoose.connect(
    process.env.MONGO_URL, {
    "auth": {
      "authSource": "root"
    },
    "user": process.env.MONGO_USERNAME,
    "pass": process.env.MONGO_PASSWORD
  }
).then(() => console.log('it works!'))

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})