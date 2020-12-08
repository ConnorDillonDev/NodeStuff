const mongoose = require('mongoose')

//create a schema/structure for the db
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min: 0
    },
    category:{
        type:String,
        enum:['fruit', 'vegetable'],
        lowercase:true
    }
});

//assign schema
const Product = mongoose.model('Product', productSchema);

//export for use in seeds.js
module.exports = Product;