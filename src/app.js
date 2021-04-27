const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirextoryPAth = path.join(__dirname, '../public')
const viewPAth = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hanhlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPAth)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirextoryPAth))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Deepak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App About',
        name: 'Deepak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Deepak'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if(error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast,
                address: req.query.address              
            })
        })
    })    
})

app.get('/products', (req, res) => {
    
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        'products':[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': 'Page not found',
        'message': 'Help article not found',
        'name': 'Deepak Sharma'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': 'Page not found',
        'message': 'My 404 page',
        'name': 'Deepak Sharma'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})