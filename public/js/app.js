const weatherForm = document.querySelector('form')
const location_ = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const weatherServerURL = 'http://localhost:5000/weather?address=' + location_.value
    message_1.textContent = "Loading..."
    message_2.textContent = ""
    fetch(weatherServerURL).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message_1.textContent = data.error
            } else {
                message_1.textContent = "Location: " + data.location
                message_2.textContent = "Forecast: " + data.forecast
            }
        })
    })
})
