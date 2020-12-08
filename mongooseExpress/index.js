const mongoose = require('mongoose');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override') //allows custom form actions PUT etc

const app = express();

const Product = require('./models/product');

// setting up mongoDB
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

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


//set form post route
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save(); //save to mongoDB
    console.log(newProduct);
    res.redirect(`products/${newProduct._id}`) //redirect to new productID
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

//edit
app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product})
})

//put replace obj, patch change parts
app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
    res.redirect(`/products/${product._id}`)

})
//creating a index.ejs for www./products
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', {products}); //passing obj to index.ejs for use
})

app.get('/products/:id', async (req, res)=>{
    const {id} = req.params;
    const product = await Product.findById(id) //search via _id
    console.log(product);
    res.render('products/show', {product})
})

//delete
app.get('/products/:id/delete', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    console.log(product);
    res.redirect('/products')
})

//ensure app is running on port
app.listen(3000, () => {
    console.log('app is running on port 3000')
})
