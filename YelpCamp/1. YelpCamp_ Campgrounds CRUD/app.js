//require section
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Campground = require('./model/campground')     //exports from campground.js

//ejs setup & path
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))


//middleware
app.use(express.urlencoded({ extended: true }))     // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))


//creating server
app.listen(3000,()=>{ 
    console.log('Server Started at Port 3000: ')
})

//connection with mongoose
mongoose.connect('mongodb://localhost:27017/YelpCamp') //connected to YelpCamp database
.then(()=>{
    console.log('Mongo connnection successful: ') 
})
.catch((e)=>{
    console.log('Mongo connection failed !!')
    // console.log(e)
})


//All routes below listed

//index
app.get('/campgrounds',async (req,res)=>{
    const campgrounds = await Campground.find({})
    // console.log(campgrounds)
    res.render('campgrounds/index',{campgrounds})
})

//New
app.get('/campgrounds/new',(req,res)=>{
    res.render('campgrounds/new')
})

//Create
app.post('/campgrounds', async (req,res)=>{
    const {title,location} = req.body
    
    const newlyCreatedProduct = {
        title:title,
        location:location
    }
    const camp = new Campground(newlyCreatedProduct)

    try{
        await camp.save()
        res.redirect(`/campgrounds/${camp._id}`)   //get req by default
    }catch(e){
        console.log('data store failed')
        console.log(e)
    }
})


//show
app.get('/campgrounds/:id', async (req,res)=>{          //shobar last e rakhbo noile onno route e conflict korbe
    const {id} = req.params
    const specificCampground = await Campground.findById(id)
    res.render('campgrounds/show',{specificCampground})
})

//Edit 
app.get('/campgrounds/:id/edit', async (req,res)=>{   
    const {id} = req.params
    const specificCampground = await Campground.findById(id)
    res.render('campgrounds/edit',{specificCampground})
})

//patch
app.patch('/campgrounds/:id',async (req,res)=>{
    const {id} = req.params

    const updatedProduct = await Campground.findByIdAndUpdate(id,{...req.body.camp},{runValidators:true,new:true})  
    res.redirect(`/campgrounds/${updatedProduct._id}`)   //get req by default
    
    //{...req.body.camp} -->all data is grouped inside 'camp' object (edit.ejs) then we spread it when pass
    //camp[location],camp[title] ---> grouping data inside a 'camp' object (edit.ejs)
})

app.delete('/campgrounds/:id', async (req,res)=>{
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})





/*
                            Working Flows
----------------------------------------------------------------------- 
step01: npm init -y (package.json create)
step02: install express,ejs,mongoose,method-override (npm i express ejs mongoose method-override)
step03: create views and model folder (mkdir views model)
step04: create app.js file
step05: create server at any port
step06: run database from powershell (mongod) 
step07: connect server with mongoose database
step08: define route
step08: run server using nodemon (nodemon app.js)

step09: define schema/schemas ,create model/models (inside model folder) 
        and module.exports model/models so that we can use model outside
step10: require exports file   
step11: --> seeding database (ready database to perform CRUD) 
        --> seeds folder e seeding materials ache (cities.js and seedHelpers.js)
        --> seeds/index.js e seed korar code likhbo then run kore (node seeds/index.js) database seed korbo       

step12: inside 'views' folder create a folder 'campground'
        inside 'campground' we create our routing pages


                            step:13:  perform CRUD

        Name             Path                   Verb                     Purpose
-------------------------------------------------------------------------------------------------------
        Index         /campgrounds              GET             Display All Campgrounds
        Show          /campgrounds/:id          GET             Details for a specific Campgrounds

        New           /campgrounds/new          GET             Form to create new Campgrounds
        Create        /campgrounds              POST            Creates new Campgrounds on server

        Edit          /campgrounds/:id/edit     GET             Form to edit specific comment          
        Update        /campgrounds/:id          PATCH           Updates specific comment on server

        Destroy       /campgrounds/:id          DELETE          Deletes specific item on server
*/