//require section
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Campground = require('./model/campground')     //exports from campground.js
const ejsMate = require('ejs-mate')         //layout package 

//ejs setup & path
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))

app.engine('ejs',ejsMate)      //for using ejs-mate we have to do it

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
                            ejs-mate
----------------------------------------------------------------------- 
step01: npm i ejs-mate 
step02: require it  
step03: app.engine('ejs',ejsMate)      //for using ejs-mate we have to do it
step04: create layouts folder inside views
step05: create boilerplate.ejs undeet layouts folter
step06: add code on boilerplate 
step07: add <% layout('layouts/boilerplate') %> on different ejs page to use boilerplate

        ***We use boilerplate to edit one place that will effect multiple pages***
*/