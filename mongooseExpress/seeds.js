const Product = require('./models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Mongo connection open!')
    }).catch((err) => {
    console.log('Mongo connection error' + err);
})

// const p = new Product({
//     name: 'grapefruit',
//     price: '2',
//     category: 'fruit'
// })
// p.save().then((p) => {
//     console.log(p);
// })
//     .catch((err) => {
//         console.log(err);
//     })

const seedProducts = [
    {
        name: 'grapefruit',
        price: '2',
        category: 'fruit'
    },
    {
        name: 'dragonfruit',
        price: '3',
        category: 'fruit'
    },
    {
        name: 'carrot',
        price: '1',
        category: 'vegetable'
    },
    {
        name: 'onion',
        price: '4',
        category: 'vegetable'
    },
    {
        name: 'tomato',
        price: '10',
        category: 'vegetable'
    }
]

//insert all items from above
Product.insertMany(seedProducts).then((resp)=> {
    console.log(resp)
}).catch((err)=>{
    console.log(err);
})