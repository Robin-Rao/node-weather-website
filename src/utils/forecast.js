const request = require ('request')
const forecast = (latitude,longitude,callback) =>
{
    url = 'https://api.darksky.net/forecast/8781a80ada6a911bd7b634f2d8887fea/'+ latitude + ','+ longitude
    request({url,json:true},(error,{body})=> {
        if(error){
            callback('unable to coonect to location services',undefined)}
            else if(body.error) {
            callback('unable to find location',undefined)    
            } 
            else {
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' Fahrenheit out. There is a ' + body.currently.precipProbability + '% chance of rain.')
                
            }
        

    })
}
module.exports = forecast