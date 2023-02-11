const mongoose = require('mongoose')
const Schema = mongoose.Schema  //just for re-use

//define a schema 
const reviewSchema = new Schema({   
    body:String,
    rating:Number,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

//create review model and exported
module.exports = mongoose.model('Review',reviewSchema)