const request = require('request')

const geocode = (address, callback) => {
    const url = "https://geocode.maps.co/search?q=" + address
    const requestOptions = { url, json: true }
    request(requestOptions, (error, response) => {
        if(error) {
            callback('Unable to connect geocoding service!')
        } else if(response.body.length == 0) {
            callback('Unable to find gecoding data, please try for another location')
        } else {
            const { lat, lon, display_name: location } = response.body[0] 
            callback(null, {
                lat, 
                lon,
                location
            })
        }
    })
}

module.exports = geocode

