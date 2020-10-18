const path = require('path')
const express = require('express');
const geoCode = require('./utils/geocode');
const weather = require('./utils/weather')

// to work with hbs partials hbs is required
const hbs = require('hbs')

const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

// HANDELBAR TEMPLATES


const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');
app.set('views', viewsPath);


app.use(express.static(publicDirectoryPath))




app.get('/', (req, res) =>{

    // console.log(req.query);

    res.render('index', {
        title: 'Weather',
        // title: 'weather will be shown here',
        name: 'Created by Saket',
    })
});


app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Created by  Saket Singh'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Created by  Saket Singh'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    }

    // res.send({
    //     forcast: 'It is raining',
    //     location: "Deoria",
    //     address: req.query.address,
    // })

    geoCode(req.query.address, (error, {latitude, longtitude, location} = {})=>{
        if(error){
           return res.send({ error})
        } 
      
        weather(longtitude, latitude, (error, forecastData)=>{
          if(error){
           return res.send({ error})
          } 

          res.send({
              forecast: forecastData,
              location,                      // location: location,
              address: req.query.address
          })
      
         
          
         });
       });

    // res.json([
    //    forecast = {
    //         teamprature: 30,
    //         humidity: 20,
    //    },{
    //     location : 'Deoria',
    //    }
      
    // ]);
})

app.get('/products', (req, res) =>{

    if(!req.query.search){
      return  res.send({
            error: "please provide search term"
        })
    }

    console.log(req.query.search)
    console.log(req.query.rating)
        res.send({
            products: []         
    })
})


app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        message: 'Help article is not found',
        name: 'Created by Saket singh'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        message: 'Page is not found',
        name: '&copy;Created by  Saket singh'
    })
})

app.listen(port, () =>{
    console.log(`Server is ready at ${port}`)
 });

