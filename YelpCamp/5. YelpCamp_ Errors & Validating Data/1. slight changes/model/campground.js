const mongoose = require('mongoose')
const schema = mongoose.Schema  //just for re-use

//define a schema 
const campgroundSchema = new schema({   
    title:String,
    image:String,
    price:Number,
    description:String,
    location:String
})

//create model
module.exports = new mongoose.model('Campground',campgroundSchema)