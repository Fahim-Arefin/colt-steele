//require section
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Campground = require('./model/campground')     //exports from campground.js
const ejsMate = require('ejs-mate')         //layout package 
const ExpressError = require('./utils/ExpressError')        //custom error class

//ejs setup & path
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.engine('ejs', ejsMate)      //for using ejs-mate we have to do it

//middleware
app.use(express.urlencoded({ extended: true }))     // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))


//creating server
app.listen(3000, () => {
    console.log('Server Started at Port 3000: ')
})

//connection with mongoose
mongoose.connect('mongodb://localhost:27017/YelpCamp') //connected to YelpCamp database
    .then(() => {
        console.log('Mongo connnection successful: ')
    })
    .catch((e) => {
        console.log('Mongo connection failed !!')
        // console.log(e)
    })


//All routes below listed

//index
app.get('/campgrounds', async (req, res, next) => {
    try {
        const campgrounds = await Campground.find({})
        // console.log(campgrounds)
        res.render('campgrounds/index', { campgrounds })
    } catch (e) {
        next(e)
    }
})

//New
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

//Create
app.post('/campgrounds', async (req, res, next) => {
    try {
        if(!req.body.camp){
            throw new ExpressError('Using post man to avoid required input?? lol , Caught you !!',400)
        }
        const camp = new Campground(req.body.camp)
        await camp.save()
        res.redirect(`/campgrounds/${camp._id}`)   //get req by default
    } catch (e) {
        next(e)     //passing error to error handling middleware
    }
})

//show
app.get('/campgrounds/:id', async (req, res, next) => {          //shobar last e rakhbo noile onno route e conflict korbe
    try {
        const { id } = req.params
        const specificCampground = await Campground.findById(id)
        res.render('campgrounds/show', { specificCampground })
    } catch (e) {
        next(e)
    }

})

//Edit 
app.get('/campgrounds/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params
        const specificCampground = await Campground.findById(id)
        res.render('campgrounds/edit', { specificCampground })
    } catch (e) {
        next(e)
    }

})

//patch
app.patch('/campgrounds/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const updatedProduct = await Campground.findByIdAndUpdate(id, { ...req.body.camp }, { runValidators: true, new: true })
        res.redirect(`/campgrounds/${updatedProduct._id}`)   //get req by default
    } catch (e) {
        next(e)
    }

    //{...req.body.camp} -->all data is grouped inside 'camp' object (edit.ejs) then we spread it when pass
    //camp[location],camp[title] ---> grouping data inside a 'camp' object (edit.ejs)
})

app.delete('/campgrounds/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await Campground.findByIdAndDelete(id)
        res.redirect('/campgrounds')
    } catch (e) {
        next(e)
    }

})

//if no route is match then its run
app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not found',404))
})

// //error handling middleware
// app.use((err, req, res, next) => {
//     // res.send('Oh boy! Something Went Wrong !!')
//     const{statusCode=500,message='something went wrong'} = err
//     res.status(statusCode).send(message)
// })

//error handling middleware (respond with a ejs page)
app.use((err, req, res, next) => {
    // res.send('Oh boy! Something Went Wrong !!')
    const{statusCode=500} = err
    if(!err.message){
        err.message = 'something went wrong !!'
    }
    res.status(statusCode).render('errorPages/error',{err})
})



/*
                            ejs-mate
------------------------------------------------------------------------------------------- 
step01: npm i ejs-mate 
step02: require it  
step03: app.engine('ejs',ejsMate)      //for using ejs-mate we have to do it
step04: create layouts folder inside views
step05: create boilerplate.ejs undeet layouts folter
step06: add code on boilerplate 
step07: add <% layout('layouts/boilerplate') %> on different ejs page to use boilerplate

        ***We use boilerplate to edit one place that will effect multiple pages***

                            Adding basic design
-------------------------------------------------------------------------------------------
step01: first add bootstrap css and js link to boilerplate

step02: create patials folder under views 

step03: create navbar.ejs file under partials 
step04: write code for navbar inside navbar.ejs 
step05: include it to boilerplate so that it will show all the pages  

step06: create footer.ejs file under partials 
step07: write code for footer inside footer.ejs 
step08: include it to boilerplate so that it will show all the pages  

step09: update model and do seed data newly bcz random image and description is added 

step11: style show page
step12: style index page
step13: style new form page

                                                Changes In this folder
------------------------------------------------------------------------------------------------------------------------------
01: we made changes inside new.ejs
    name="title" to name="camp[title]" and so on...
02: app.post('/campgrounds', async (req,res)=>{} we tweak this route according to the changes inside new.ejs

03: 
        now we are going to apply 'Client-Side-Validation' using bootstrap form validation 
    ------------------------------------------------------------------------------------------
        ## first go to  'bootstrap-5 --> form --> validation' read the doc
        ## now we are going to change our form (new.ejs,edit.ejs)
        ## we first add 'required' to all the inputs
        ## then add 'novalidate' to form to prevent browser required so that we can use bootstrap to handle this required field
        ## then give form a class for example: class="needs-validation"
        ## then add js portion from 'bootstrap-5 --> form --> validation' to the boilerplate  
        ## if we want to give valid-feedback we need add a div with class="valid-feedback" (check docs)
        ## now its working   ^_^ ^_^
        ## so do the same thing with edit.ejs 
        
04: 
                                now we are going 'Handle Error'  
    ------------------------------------------------------------------------------------------
        ## now we done with Client-side-validaton so if we set price to string it will throw type casting error 
        ## So We have to handle errors like this
        ## First Add error handler middleware after 'All the route' 
        ## then add try catch block to every async func and pass error to 'err handling middleware' by calling next(e) inside catch
        ## We can make a func if we want to reduce typing try catch over and over again (optional)
        ## Now we are defining custom error class
        ## create a folder name 'utils' and inside we make a ExpressError.js class 
        ## write custom error class inside ExpressError.js and export it
        ## require in in this file and use it
        ## we can throw our own custom errors
        ## so we now include our page not found route which will activate if there is 
           no route matched , it must be placed as a last route. Now from here we throw custom error
        ## we also modified 'err handling middleware' so that every error can have status code
        
        ## Now though we have required all input field from front end yet anyone can bypass it
           using app like 'postman'
        ## So we need to validate about require field from the backend also
        ## for that we use 'joi' little bit later. Now just demostrate if there is no camp object in body
           from backend we throw a custom error.  
           check the create route for example.
           (in Postman send post req to create route without any camp[] obj then you can see the error message
            but if we push a camp obj using post man without all the field like camp[tittle] camp[location]
            ..... then it will create a new campground because we just checked 
            if(!req.body.camp){
            throw new ExpressError('Using post man to avoid required input?? lol , Caught you !!',400)
            } 
            )



        ## Now lets respond with a template or somewhat like this bzc so far we responded errors with a simple text message  
        ## so create a folder inside views folder named errorPages and inside make a error.ejs file
        ## copy alert code from bootstrap--> Alert section (read docs)
        ## paste it inside error.ejs and edit code 
        ## linked it  '<% layout('layouts/boilerplate') %>'    with boilerplate
        ## re-write err handler middleware (instead of sending text we now render error.ejs page if any error occurs)
        


*/