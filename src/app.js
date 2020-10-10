const path = require('path')
const express = require('express') //express is a function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()  //created express app
const port = process.env.PORT || 3000   

//define paths for express config.
const public_directory_path = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templetes/views') // __dirname sends us to the directory in which app.js file lives in this case it sends us in src folder so by doing .. we got out of it and by doing /templetes we entered in templetes folder
const partialspath = path.join(__dirname,'../templetes/partials')

//set up handlebars engine and views location
app.set('view engine','hbs') // setting the handlebars to express
app.set('views',viewpath) //tellings express that what is the path of templetes folder
hbs.registerPartials(partialspath)

//set up static directory to serve
app.use(express.static(public_directory_path)) // telling express that what is the path of public folder


app.get('',(req,res) => {
    res.render('index', { //res.render('') is same as res.send this is used to render one of our views. The first argument should be the string which we are passing in it should match with the hbs file while we wanna get renderd in it. And the second argument would be the object which we wanna acess to the page
        title:"Weather App",
        name:"Gourav Rathor"
    }) 
})

app.get('/weather', (req,res) => {
    const address = req.query.address // if we have searched for /weather?address=ram+sharam the req.query.address will give us the value of as 'ram sharma'
    if(!address)
    {
        return res.send({
            error:'You have to provide address!'
        })
    }

    else{
        geocode(address, ( error , {longitute,latitute,place} = {} ) => { //geocode(address, (error, data) => {
            if(error)
            {
               return res.send({ 
                   error: error
               })
            }
            else
            {
                forecast(longitute, latitute, (error, forcastdata) => { // forecast(data.longitute,data.latitute)
                    if(error)
                    {
                        return res.send({  error })
                    }
                    else
                    {
                        res.send({
                            forcast:forcastdata,
                            place:place,
                            address:req.query.address
                       })
                    }
                 })
            }
        })
    }

})

app.get('/about',(req,res) => {
    res.render('about', {
        title:"About page",
        name: "Gourav Rathor"
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:"Help page",
        name: "Gourav Rathor"
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        name: 'Gourav Rathor',
        errorMessage: 'Help artical not found'
    })
})

app.get('*',(req,res) => { //"*" is for match of all if the commands upper it won't get matched the this will run so we have to put it in last
    res.render('404',{
        title:"404",
        name: "Gourav Rathor",
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {  // app.listen will start our server
    console.log('Server is up on port '+port)
})
