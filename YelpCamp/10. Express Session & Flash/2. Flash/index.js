//Basic setup

//require 
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride  = require('method-override')        //npm i method-override
const session = require('express-session')
const flash = require('connect-flash')

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

//session excute
sessionOptions ={
    secret:'thisisnotagoodsecret',  //secret just like cookies
    resave:false,                   //for remove warning
    saveUninitialized:true         //for remove warning
}
app.use(session(sessionOptions))    //after execution we now use req.session property

//flash execute
app.use(flash())

//flash messsage middleware 
app.use((req,res,next)=>{
    res.locals.messages = req.flash('success')    //success is the key 
    next()
})



//server start
app.listen(8008,()=>{
    console.log('Server started: ')
    console.log('listening on PORT 8008: ')
})

//All routes

// GET/products    --->  list all products (Read all)
app.get('/products',async (req,res)=>{
    const allProduct = await Product.find({})  //find all products
    // res.render('products/index',{allProduct, messages : req.flash('success')})  //pass flash message to the template
    res.render('products/index',{allProduct})   //now dont need to pass flash , it will be passed throu flash middleware
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
        req.flash('success','Successfully made a new product')
        res.redirect('/products')   //get req by default
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
                            flash
-----------------------------------------------------------------
    ## this code is copied from put all togather folder

    ## Connect-flash is a middleware for the Express framework in Node.js that provides a way 
       to store messages in the session. These messages are intended to be displayed to the user
       after a redirect. Connect-flash is useful for providing feedback to the user,
       such as success or error messages, after a form submission or other user action.

    ## The messages are stored in the session and cleared after being displayed to the user.
    
    ## first install npm i express-session. connect-flash depends on session
    ## then install npm i connect-flash
    ## require and exicute 
       app.use(flash())
       app.use(session())

    ## With the flash middleware in place, all req will have a req.flash()
       that can be used to flash message

    ## req.flash('success','Successfully made a new product')
       add this before redirect. 
       first parameter is for key to that message second parameter is the message 
    
    ## we change in create route, we add req.flash() before redirect
       then we change index route as we passed the message to the template
                    (messages : req.flash('success'))
       then we show it in the index.ejs template.
     
    ## improvement 
       we have to pass it everytime in other routes if needed 
       so we make a middleware and pass it to that then
       every template has the access of this flash message
    
    ## first execute session then flash then flash middleware --> this order should be maintained
    ## After refresh flash message will deleted autometically
   
*/