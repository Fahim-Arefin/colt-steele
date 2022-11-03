//Basic setup

//require 
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride  = require('method-override')        //npm i method-override

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

//middleware
app.use(express.urlencoded({ extended: true }))     //for parsing application/x-www-form-urlencoded
                                                    //form theke post data send korte hole eita use korbo
app.use(methodOverride('_method'))

//server start
app.listen(8008,()=>{
    console.log('Server started: ')
    console.log('listening on PORT 8008: ')
})

//All routes

// GET/products    --->  list all products (Read all)
app.get('/products',async (req,res)=>{
    const allProduct = await Product.find({})  //find all products
    res.render('products/index',{allProduct})
})

// GET/products/new  --->   Form to create new products
app.get('/products/new',(req,res)=>{    
    res.render('products/newProduct') 
})

//GET/products/:id   --->  Get one products (Read one using ID)
app.get('/products/:id',async (req,res)=>{      //eita last e add kora lagbe noile products/new er shathe crash korbe
    const {id} = req.params
    const oneProduct = await Product.findById(id)  //find one product
    res.render('products/show',{oneProduct})
})



// POST/products   --->   Create a new products 
app.post('/products',async (req,res)=>{
    const {name,price,category} = req.body
    
    const newlyCreatedProduct = {
        name:name,
        price:parseFloat(price), //parse na korleo automatic database validation e Number e cast hoiye jabe 
        category:category
    }
    const product = new Product(newlyCreatedProduct)

    try{
        await product.save()
        res.redirect(`/products/${product._id}`)   //get req by default
    }catch(e){
        console.log('data store failed')
        console.log(e)
    }
})

// GET/products/:id/edit  --->  Form to edit specific products
app.get('/products/:id/edit',async (req,res)=>{
    const {id} = req.params
    const foundProduct = await Product.findById(id)  //find one product
    res.render('products/edit',{foundProduct})
})

// PATCH/products/:id	  --->  Update one products 
app.patch('/products/:id',async (req,res)=>{
    const {id} = req.params
    const {name,price,category} = req.body
    const updateProductData = {
        name:name,
        price:parseFloat(price), //parse na korleo automatic database validation e Number e cast hoiye jabe 
        category:category
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,updateProductData,{runValidators:true,new:true})
    res.redirect(`/products/${updatedProduct._id}`)   //get req by default
})


// DELETE/products/:id	  --->  Destroy one comments
app.delete('/products/:id',async (req,res)=>{
    const {id} = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')       //get req by default
})



/*
                        Basic Steps:
-----------------------------------------------------------------
step01: npm init -y (json create)
step02: npm i express ejs mongoose (install required things)
step03: create views directory  
step04: create index.js file  
step05: required express mongoose mathod-override (ejs is not required)  
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


                        All Route (CRUD)
--------------------------------------------------------------------
   GET/products      --->       list all products (Read all)
   GET/products/:id	 --->       Get one products (Read one using ID)

   GET/products/new  --->       Form to create new products
   POST/products     --->       Create a new products 

   GET/products/:id/edit  --->  Form to edit specific products
   PATCH/products/:id	  --->  Update one products 

   DELETE/products/:id	  --->  Destroy one product
   
*/