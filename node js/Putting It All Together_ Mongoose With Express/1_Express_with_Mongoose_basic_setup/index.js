//Basic setup

//require 
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

//connection with mongoose
mongoose.connect('mongodb://localhost:27017/movies')
.then(()=>{
    console.log('Mongo connnection successful: ') 
})
.catch((e)=>{
    console.log('Mongo connection failed !!')
    console.log(e)
})

//views setup for ejs
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')

//server start
app.listen(8008,()=>{
    console.log('Server started: ')
    console.log('listening on PORT 8008: ')
})

//route
app.get('/dogs',(req,res)=>{
    res.send('woof!')
})




/*
                        Basic Steps:
-----------------------------------------------------------------
step01: npm init -y (json create)
step02: npm i express ejs mongoose (install required things)
step03: create views directory  
step04: create index.js file  
step05: required express mongoose (ejs is not required)  
step06: finish code  
step07: run mongod (database) with power shell   
step08: start server (nodemon index.js)

*/