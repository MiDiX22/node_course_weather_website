const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fdb0df83e937b736ec67c284a4a577ed&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Right now it is '+body.current.weather_descriptions + ', and it is currently ' + body.current.temperature + ' degress out. With a ' + body.current.humidity +' % of humidity.')   
        }
    })
}

module.exports = forecast