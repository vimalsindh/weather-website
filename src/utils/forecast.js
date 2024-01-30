const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const weatherStackURL = "http://api.weatherstack.com/current?access_key=2c2188c819d46cfca2f3320d7dfd1f22&query=" + latitude + "," + longitude
    request({url: weatherStackURL, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect weather service!')
        } else if(response.body.error) {
            callback('Unable to find weather data.')
        } else {
            const { temperature, precip: precipitation } = response.body.current
            callback(null, {
                temperature,
                precipitation
            })
        }
    })
}

module.exports = forecast