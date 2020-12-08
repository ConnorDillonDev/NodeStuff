const mongoose = require('mongoose');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

const Product = require('./models/product');

//setting up mongoDB
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Mongo connection open!')
    })
    .catch((err) => {
        console.log('Mongo connection error' + err);
    })

// set engine view and serve views dir
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//creating a index.ejs for www./products
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', {products}); //passing obj to index.ejs for use
})

//ensure app is running on port
app.listen(3000, () => {
    console.log('app is running on port 3000')
})
