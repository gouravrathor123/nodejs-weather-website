const request = require('postman-request')


const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=77c650a5f2cfb5942a5e80c0be7caefc&query=' + latitude + ',' + longitude

    request({ url , json : true}, (error,{body}) => { //{ url: url,json: true} value of url is comming from above and in (error,{body}) can be replace with (error,response )
    
        if(error)
        {
            callback('Please check your internet connection',undefined)
        }
        else if(body.success) 
        {
            callback('Please enter the valid cordinates',undefined)
        }
        else
        {
          callback(undefined, "It's " + body.current.temperature + ' degree celsius at ' + body.current.observation_time + '. Wheather description is ' + body.current.weather_descriptions[0] + '. The wind speed is ' +body.current.wind_speed+'km/h. ')
        }
    })
}

module.exports = forecast