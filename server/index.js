require('dotenv').config({path: './config/.env'})
const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
// const cors = require('cors')

const app = express()
const port = 8080

// const publicDirPath = path.join(__dirname, '../client/react-app/public')
// app.use(express.static(publicDirPath))

app.use(express.static(path.resolve(__dirname, '../client/react-app/build')));

app.get("/api", async (req, res) => {
    try {
        const location = req.query.q
        const units = req.query.units
        const apiKey = process.env.OWM_API_KEY
        const url = 'http://api.openweathermap.org/data/2.5/forecast'
        const response = await fetch(`${url}?q=${location}&units=${units}&appid=${apiKey}`)
        const data = await response.json()
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message)
    }
})

app.use(function(req, res) {
    res.status(404).sendFile(publicDirPath + '/html/404.html');
});

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})