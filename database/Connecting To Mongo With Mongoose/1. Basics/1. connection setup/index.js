//here we saw how to connent mongoose to mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies')
.then(()=>{
    console.log('connnection successful: ') 
})
.catch((e)=>{
    console.log('connection failed !!')
    console.log(e)
})



/*
                    steps to connect mongo with mongoose
-----------------------------------------------------------------------------------

step01 : start 'mongod' with powershell
step02 : install 'npm i mongoose'
step03 : write the code avobe as shown
step04 : execute index.js file from bash

mongoose.connect('mongodb://localhost:27017/movies')  ---> 'movies = database name'  '27017' = default database server 


*/
