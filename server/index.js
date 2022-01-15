const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
require('dotenv').config({ path: path.join(__dirname, 'config/.env') })

const app = express()
const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, '../client/build'), { extensions: ['html', 'css', 'js', 'svg'] }))

app.get('/api', async (req, res) => {
    try {
        const location = req.query.q
        const units = req.query.units
        const apiKey = process.env.API_KEY
        const url = 'http://api.openweathermap.org/data/2.5/forecast'
        // const url = 'http://api.openweathermap.org/errorURLforDevEnv'
        const response = await fetch(`${url}?q=${location}&units=${units}&appid=${apiKey}`)
        const data = await response.json()
        return res.status(200).json(data)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json(err.message)
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/html', 'about.html'))
})

app.use(function (req, res) {
    res.status(404).sendFile(path.resolve(__dirname, '../client/build/html', '404.html'))
})

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})