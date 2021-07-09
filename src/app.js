const { request } = require('express')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'wheather app',
        name: 'Miriam Gertrudix'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is the about page',
        name: 'Miriam Gertrudix'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'I am here to help you!',
        name: 'Miriam Gertrudix'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
          return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({ error })
          }

          res.send({
              location, 
              forecast: forecastData
          })

        })
      })

})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'you must provide a term of search'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         poducts: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404!',
        name: 'Miriam Gertrudix',
        errorMessage: 'Help article found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404!',
        name: 'Miriam Gertrudix',
        errorMessage: 'page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})