const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3001
app.use(express.static(path.join(__dirname, "dist")))

app.listen(PORT, () => console.log(`server berjalan di port ${PORT}`))