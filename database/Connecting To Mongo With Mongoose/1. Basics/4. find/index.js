//here we saw insert Many


//this tis connection setup part
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp')
.then(()=>{
    console.log('connnection successful: ') 
})
.catch((e)=>{
    console.log('connection failed !!')
    console.log(e)
})

//defining schema
const movieSchema = new mongoose.Schema({
    title : String,  
    year : Number, 
    scrore : Number, 
    rating : String  
})

//creating a model
const Movie = mongoose.model('Movie',movieSchema)   


//*** uncomment one by one and execute this file from bash ***
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Movie.find({}).then(data => console.log(data))

// Movie.findOne({title:'interstellar'}).then(data => console.log(data))

// Movie.find({year:{$lt:2012},scrore:{$gt:9.0}})
// .then(data => console.log(data))
// .catch((e)=>{
//     console.log(e)
// })

Movie.findById('634d2b0ab22241171bbbe584')         //very commonly used
.then(data => console.log(data))
.catch((e)=>{
    console.log(e)
})


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++