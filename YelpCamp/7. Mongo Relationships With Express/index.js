//Basic setup

//require 
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride  = require('method-override')        //npm i method-override

//require my files
const Product = require('./models/product') //exported from product.js file
const Farm = require('./models/farm') //exported from farm.js file

//connection with mongoose
mongoose.connect('mongodb://localhost:27017/farmStandRelationship') //connected to farmStand database
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
app.listen(8009,()=>{
    console.log('Server started: ')
    console.log('listening on PORT 8009: ')
})

                                            //All routes
// ----------------------------------------------------------------------------------------------------------------


                        //Farm Routes
//-------------------------------------------------------------

// GET/farms    --->  list all farms (Read all)
app.get('/farms',async (req,res)=>{
    const allFarms = await Farm.find({})  //find all products
    res.render('farms/index',{allFarms})
})

// GET/farms/new  --->   Form to create new farms
app.get('/farms/new',(req,res)=>{    
    res.render('farms/new') 
})

//GET/farms/:id   --->  Get one farms (Read one using ID)
app.get('/farms/:id',async (req,res)=>{      //eita last e add kora lagbe noile farms/new er shathe crash korbe
    const {id} = req.params
    const farm = await Farm.findById(id).populate('products')  //find one farm also with populate data
    res.render('farms/show',{farm})
})


// POST/farms   --->   Create a new farm 
app.post('/farms',async(req,res)=>{
    const farm = new Farm(req.body)
    await farm.save()
    res.redirect('/farms')  //get req by default
})


// DELETE/farms/:id	  --->  Destroy one farm with the product/products
app.delete('/farms/:id',async(req,res)=>{
    // console.log('deleting...!')
    const farm = await Farm.findByIdAndDelete(req.params.id)    //it will delete and return deleted obj
    res.redirect('/farms')
})


// GET/farms/:id/products/new  --->        Form to create new products
app.get('/farms/:id/products/new',async(req,res)=>{
    const {id} = req.params
    const farm = await Farm.findById(id)
    res.render('farms/addProduct',{farm})
})

// POST/farms/:id//products     --->       Create a new farm with a products 
app.post('/farms/:id/products',async(req,res)=>{
    const {id} = req.params
    const farm = await Farm.findById(id)    //finding farm
    const {name,price,category} = req.body
    const product = new Product({name,price,category})  //creating product

    farm.products.push(product)
    product.farm = farm

    await farm.save()
    await product.save()

    res.redirect(`/farms/${id}`)
})



                        //Product Routes
//-------------------------------------------------------------

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
    const oneProduct = await Product.findById(id).populate('farm','name')  //find one product
    console.log(oneProduct)
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


                            New In This Folder
-------------------------------------------------------------------------------
     ## Already created and exported our Product Model inside product.js file under models folder
     ## Now Creating our Farm Model inside farm.js file under models folder and we exported it also


     ## We are doing two ways  relationShip here
     ## Each peoducts have its parent reference (farm)      (one to bizillions)
     ## Each farm has multiple child reference  (product)   (one to many)


     ## create farm route like porduct 

     ## New Route to Add products to a perticular farm

        GET/farms/:id/products/new  --->        Form to create new products
        POST/farms/:id//products     --->       Create a new farm with a products

     ## product/:id route is slightly changed
     

                                Delation Mongoose Middleware
     --------------------------------------------------------------------------------
     ## here if any farm is deleted products within that farm also be deleted 
     ## first set the delete Route
     ## We want to delete farm also associated products 
     ## We can do it manually but We want to do it with 'Mongoose Middleware'

     ## findByIdAndDelete() function triggers the following mongoose query middleware.
        *findOneAndDelete()   (read docs mongoose --> API --> models -- > findByIdAndDelete() )

     ## if we saw docs of findByIdAndDelete() we can see that it triggers findOneAndDelete() query middleware
     ## Mongoose middlewares are 4 type , document middleware,query middleware...
     ## Mongoose-->middleware (read docs)
     ## so we set post middleware in the farmSchema (farm.js file) before compile Farm model

     ## see farm.js file
     
    


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