//here we will see find


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
    score : Number, 
    rating : String  
})

//creating a model
const Movie = mongoose.model('Movie',movieSchema)   


//*** uncomment one by one and execute this file from bash ***
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Movie.find({}).then(data => console.log(data))

// Movie.findOne({title:'interstellar'}).then(data => console.log(data))

// Movie.find({year:{$lt:2012},score:{$gt:9.0}})
// .then(data => console.log(data))
// .catch((e)=>{
//     console.log(e)
// })

Movie.findById('63ca23bbe79a4ccc7dcc75c9')         //very commonly used
.then(data => console.log(data))
.catch((e)=>{
    console.log(e)
})


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++