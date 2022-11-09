//define a Product model
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:[0,'price can not be below zero']
    },
    category:{
        type:String,
        lowercase:true,
        enum:['fruit','vegetable','dairy']
    }
})

const Product = mongoose.model('Product',productSchema)

module.exports=Product

//insertMany() eikhane jodi kono ekta object validation violate kore tahole whole jinistai insert hobena
//insertMany() first e shb obj er validation check kore tarpor ekshathe shbgula database e enter koray
//tai validation check er shomoy kono obj fail hobe pura insertMany() operation fail hoye jay 