const mongoose = require('mongoose')
const Schema = mongoose.Schema  //just for re-use
const Review = require('./review')

//define a Schema 

imageSchema = new Schema({
    url: String,
    filename: String
})

// https://res.cloudinary.com/dshiwsbap/image/upload/v1675886437/YelpCamp/irp0rbo6c2xhgcv6cvqf.jpg

//for reduce width when delete
imageSchema.virtual('thumbnil').get(function(){
    return this.url.replace('/upload','/upload/w_200')
})

const campgroundSchema = new Schema({
    title: String,
    image: [imageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
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
campgroundSchema.post('findOneAndDelete', async function (campground) {
    if (campground.reviews.length) {
        const res = await Review.deleteMany({ _id: { $in: campground.reviews } })
        console.log(res)
    }

})

//create campground model and exported
module.exports = mongoose.model('Campground', campgroundSchema)