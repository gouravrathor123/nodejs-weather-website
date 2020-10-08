const request = require('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?&access_token=pk.eyJ1IjoiZ291cmF2cmF0aG9yIiwiYSI6ImNrZnF0eG9xczB1c3QycHBmbW1nYzM0ZzMifQ.gNj2vcoZClO5Cq4ZORFd5g'

    request({url, json:true}, (error,{body}) => {
        if(error)
        {
            callback('Please check your internet connection', undefined)
        }
        else if(body.features.length === 0)
        {
            callback('Unable to find the location try differnt location')
        }
        else
        {
            callback(undefined,{
                place:body.features[0].place_name,
                latitute:body.features[0].center[0],
                longitute:body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode