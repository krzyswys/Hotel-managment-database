const express = require('express')
const app     = express()
const PORT    = process.env.PORT ?? 3000

app.get("/", (req, res) => {
    res.send("Witam serdecznie")
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})