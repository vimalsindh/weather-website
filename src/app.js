const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')
const app = express()
const port = process.env.PORT || 5000

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vimal Kumar Sindh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Vimal Kumar Sindh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Send email to vimalk809@gmail.com for help.',
        name: 'Vimal Kumar Sindh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(lat, lon, (error, {temperature, precipitation} = {}) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: `Temperature outside is ${temperature} and chances of rain is ${precipitation}`,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help Article not found.',
        name: 'Vimal Kumar Sindh'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Vimal Kumar Sindh'
    })
})

app.listen(port, () => {
    console.log('Server started on port 5000')
})