//here we saw mongoose model 


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



/*
{
    title : 'inception',  
    year : 2016, 
    scrore : 9.2, 
    rating : 'R'  
}
*/

//defining a schema 
const movieSchema = new mongoose.Schema({
    title : String,  
    year : Number, 
    scrore : Number, 
    rating : String  
})

//creating a Movie model
const Movie = mongoose.model('Movie',movieSchema)   //returns a class which is stored in 'Movie' valirable 
                                                    //in the first parameter if we pass 'Movie' then it creates a 'movies'
                                                    //collection and also we always pass singular(without space) and first 
                                                    //letter should be capital ('Movie',movieSchema)

//collection name = movies  'Movie' model converts into plural and lowercase 'movies' as a collection
//db.movies.find()
                                                    
//insert one movie
const newMovie = new Movie({
    title : 'iron-man',  
    year : 2016, 
    scrore : 8.9, 
    rating : 'R'  
})                

//finally save it to database 
newMovie.save()    //save can be done only once 

/*
    step01 : run mongod from powershel
    step02 : execute index.js from bash (node index.js)
    step03 : again run powershell and go mongo shell
    step04 : see changes
*/