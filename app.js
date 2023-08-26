const express = require('express')
const app = express()
const path = require('path')
app.use(express.static(path.join(__dirname, "src")))

app.listen(3003, () => console.log("server berjalan di port 3003"))