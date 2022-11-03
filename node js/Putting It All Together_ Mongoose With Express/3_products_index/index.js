//Basic setup

//require 
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

//require my files
const Product = require('./models/product') //exported from product.js file

//connection with mongoose
mongoose.connect('mongodb://localhost:27017/farmStand') //connected to farmStand database
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

//All routes

//index route
// GET/products - list all products
app.get('/products',async (req,res)=>{
    const allProduct = await Product.find({})  //find all products
    console.log(allProduct)
    res.render('products/index',{allProduct})
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
------------------------------------------------------------------


                            INFO
-------------------------------------------------------------------------------
seeds.js --> initially database e kichu entry disi ei file theke (insertMany())
models directory --> eikhane shob model(table) gula create korbo then 'module.exports' korbo 
           tarpor index.js theke sheta require kore use korbo
models/project.js --> ekta model
execute seeds.js (node seeds.js) before runnig index.js to seed database with initial values


                Route
-------------------------------------------
   GET/products - list all products
   
*/