const mongoose = require('mongoose')
const Schema = mongoose.Schema  //just for re-use
const Review = require('./review')

//define a Schema 
const campgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

//Mongoose Middleware
//post
campgroundSchema.post('findOneAndDelete',async function(campground){
    if(campground.reviews.length){
        const res = await Review.deleteMany({_id: {$in:campground.reviews}})
        console.log(res)
    }    

})

//create campground model and exported
module.exports = mongoose.model('Campground', campgroundSchema)