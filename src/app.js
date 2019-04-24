const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast =  require('./utils/forecast')
const hbs = require('hbs')
const app = express ()
const directorypath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

app.use(express.static(directorypath))

app.get('',(req,res) =>
{
res.render('index',{
    title:'weather',
    name:'robin'
})
})
app.get('/about',(req,res) =>
{
res.render('about',{
    title:'ABOUT ME',
    name:'Robin'
})
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'HELP',
        name: 'Robin Rao'
    })
})
app.get('/weather',(req,res) =>
{
    
   if (!req.query.address) {
    return res.send({
        error: 'You must provide an address!'
    })
}
geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
})

app.get('*',(req,res) =>{
    res.send('404')
})
app.listen(3000,()=>{
    console.log('server is up and running')
})