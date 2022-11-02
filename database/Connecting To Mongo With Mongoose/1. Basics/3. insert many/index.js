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

// //insert one 
// const newMovie = new Movie({
//     title : 'iron-man',  
//     year : 2016, 
//     scrore : 8.9, 
//     rating : 'R'  
// })    

// newMovie.save()

//insert Many
Movie.insertMany([                              //very uncommon to see,but still we learning 
                                                //just like we saw insertMany() in mongodb folder 
                                                //we do not need to save() after insertMany
                                                // rather it returns promises 

    {title: 'interstellar', year:2013 , scrore : 8.7 , rating : 'PG'},
    {title: 'brave heart', year:1997 , scrore : 9.3 , rating : 'PG-13'},
    {title: 'robinhood', year:2006 , scrore : 8.2 , rating : 'R'},
    {title: 'top gun', year:2022 , scrore : 9.0 , rating : 'R'}

])
.then((data)=>{
    console.log('It worked! ')
    console.log(data)
})
.catch((e)=>{
    console.log('Error!')
    console.log(e)
})

