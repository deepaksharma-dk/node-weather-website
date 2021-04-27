const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e773a8ee24e368146871d02d99724646&query="+lat+","+lon

    request({url, json: true}, (error, {body}={}) =>{
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+". It is currently " + body.current.temperature +" degress out. It feels like "+ body.current.feelslike+" degress out.")
        }
    })
}

module.exports = forecast