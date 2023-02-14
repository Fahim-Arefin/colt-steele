const { number } = require('joi')
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
imageSchema.virtual('thumbnil').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema({
    title: String,
    image: [imageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
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
},opts)


//popup virtuals
campgroundSchema.virtual('properties.popupText').get(function () {
    return `<a href="/campgrounds/${this._id}">${this.title}</a>
            <p>${this.description.substring(0,20)}...</p>`
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


/*
    https://mongoosejs.com/docs/tutorials/virtuals.html#virtuals-in-json
    
    By default, Mongoose does not include virtuals when you convert a document to JSON. For example,
    if you pass a document to Express' res.json() function, virtuals will not be included by default.

    To include virtuals in res.json(), you need to set the toJSON schema option to { virtuals: true }.

    We convert our campground to Json format using stringify and now client side js can use json formet 
    
    Our mapbox expect properties on schema but we define virtuals which will not include 
    by default we need to enable it
*/