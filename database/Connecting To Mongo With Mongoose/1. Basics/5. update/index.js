//here we saw update


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

// Movie.updateOne({title:'robinhood'},{scrore:7.8,year:2010})
// .then((data)=>{
//     console.log(data)
// })
// .catch((e)=>{
//     console.log(e)
// })


// Movie.updateMany({title:{$in:['interstellar','inception']}},{scrore:10})
// .then((data)=>{
//     console.log(data)
// })
// .catch((e)=>{
//     console.log(e)
// })

// Movie.findOneAndUpdate({title:'iron-man'},{year:2003})
// .then((data)=>{
//     console.log(data)  //return the old obj
// }) 
// .catch((e)=>{
//     console.log(e)
// })


Movie.findOneAndUpdate({title:'iron-man'},{year:2000},{new:true})      //new:true will return updated obj
.then((data)=>{
    console.log(data)  //return the updated obj
})
.catch((e)=>{
    console.log(e)
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//update(),updateOne(),updateMany()      ---> dont return obj
//findOneAndUpdate()                     --->  return obj