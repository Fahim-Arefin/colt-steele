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

// Movie.deleteOne({title:'robinhood'})        //dont get back the deleted obj
// .then((data)=>{
//     console.log(data)
// })
// .catch((e)=>{
//     console.log(e)
// })

// Movie.deleteMany({year:{$lte : 2000}})        //donnt get back the deleted obj
// .then((data)=>{
//     console.log(data)
// })
// .catch((e)=>{
//     console.log(e)
// })


Movie.findOneAndDelete({title:'top gun'})        //get back the deleted obj 
.then((data)=>{
    console.log(data)
})
.catch((e)=>{
    console.log(e)
})




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

