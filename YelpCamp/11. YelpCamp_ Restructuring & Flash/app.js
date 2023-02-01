//require section
const express = require('express')
const app = express()   
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')         //layout package 

const session = require('express-session')
const flash = require('connect-flash')

const ExpressError = require('./utils/ExpressError')        //custom error class


//Require Routes
const campgroundRoutes = require('./routes/campgrounds')    //requiring campground routes
const reviewRoutes = require('./routes/reviews')            //requiring review routes

//ejs setup & path
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))


//ejs mate
app.engine('ejs', ejsMate)      //for using ejs-mate we have to do it

//middleware
//---------------------------------------------------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }))     // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))       //Serving static Assets (public directory)

const sessionConfig = {
    secret:'thisisasecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,  // cookie will remain 7 days on browser
        maxAge:1000 * 60 * 60 * 24 * 7                  // cookie will remain 7 days on browse
    }
}

app.use(session(sessionConfig))         //session execute
app.use(flash())                        //flash execute

//flash middleware
app.use((req,res,next)=>{
    res.locals.successMessage = req.flash('success')    //key is 'success'
                                                        // 'successMessage' is now accessed from anywhere (ejs or boilerplate)
    res.locals.errorMessage = req.flash('error')        //key is 'error'
    next()
})

//---------------------------------------------------------------------------------------------------------------


//creating server
//---------------------------------------------------------------------------------------------------------------
app.listen(3000, () => {
    console.log('Server Started at Port 3000: ')
})
//---------------------------------------------------------------------------------------------------------------

//connection with mongoose
//---------------------------------------------------------------------------------------------------------------
mongoose.connect('mongodb://localhost:27017/YelpCamp') //connected to YelpCamp database
    .then(() => {
        console.log('Mongo connnection successful: ')
    })
    .catch((e) => {
        console.log('Mongo connection failed !!')
        // console.log(e)
    })
//---------------------------------------------------------------------------------------------------------------


//All routes below listed
//---------------------------------------------------------------------------------------------------------------

//campground Routes
app.use('/campgrounds',campgroundRoutes)    

//review Routes
app.use('/campgrounds/:id/reviews',reviewRoutes)    //need to use mergeParams to detect this :id inside reviews.js routes

//if no route is match then its run
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})
//---------------------------------------------------------------------------------------------------------------

// //error handling middleware
// app.use((err, req, res, next) => {
//     // res.send('Oh boy! Something Went Wrong !!')
//     const{statusCode=500,message='something went wrong'} = err
//     res.status(statusCode).send(message)
// })

//error handling middleware (respond with a ejs page)
//---------------------------------------------------------------------------------------------------------------
app.use((err, req, res, next) => {
    // res.send('Oh boy! Something Went Wrong !!')
    const { statusCode = 500 } = err
    if (!err.message) {
        err.message = 'something went wrong !!'
    }
    res.status(statusCode).render('errorPages/error', { err })
})
//---------------------------------------------------------------------------------------------------------------



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
        ## require it in this file and use it
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

        

04: 
                                now we are going to handle validation using 'Joi'  
    --------------------------------------------------------------------------------------------
            ##  inside create/update route we should check 
                if(!req.body.camp.title){
                    then we match if its string or not 
                }
                if(!req.body.camp.price){
                    then we match if its number or not 
                    then we check if its less then zero or not 
                    and so on... 
                }
                ....

                so its very annoying to do it everytime. That's why we can take help with npm packages like 'joi'
                'joi' will help us to validate easily 

            ## we install 'joi' (npm i joi)
            ## require it inside this file (app.js)
            ## now read the docs and use it to validate data before insert/update.. data into mongodb
            ## https://joi.dev/api/?v=17.2.1  --->> read docs from here
            ## joi will help us to validate data before insert/update.. into mongodb
            ## we do it before database CRUD
            ## then if no error occurs then we store or read data from database (mongodb)

            ##  here we apply 'joi'on create route only but we have to do it whenever validation needs
            ##  re-write create route is done using 'joi'
            ## similarly we should re-write update route also but here it is not done



05: 
                                joi validation middleware   
    --------------------------------------------------------------------------------------------
            ## We saw that validation is needed frequently so we should make it in a middleware func then 
               pass it to route and call next() to run the 3rd parameter func
            ## Now we cut the code and make it as a middleware func
            ## Now if no error occurs call next() 
            ## here next() will activate 3rd perameter
            ## now create and update e ei middleware func ta pass kore dibo bcz ei dui jaygatei ei 
               validation lagbe
            

        ****    now we can feel that this type of validation is 
                need in different page so we should cut these code 
                to a separate file and export it so
                that every page have the access of this code
                again we need more validation code,so its a nice idea
                to have all the validation inside one place and export it 
                to different pages 
        ****

            ## So we cut the code into schema.js file which is inside validationSchema folder
            ## we export it from there and require it here
            ## then use it like before



 
                        YalpCamp_Adding_Review_Model(new folder started)   
    --------------------------------------------------------------------------------------------

    
01: 
                                defining the review model   
    --------------------------------------------------------------------------------------------
    ## We are creating review Model 
    ## under model folder we create review.js and define schema and export a model with these schema
    ## Now we update campground.js schema and extablished one to many relationship between campground and review
    ## inside campground.js we add reviews property which stores review ObjectID's as a child (one to many) 

    
02: 
                                      Adding the review form
    --------------------------------------------------------------------------------------------
    ## Now we need to add review form to get review from client/user
    ## in the campground/show.ejs file we add a review form
    ## usnig bootstrap we slightly style review form (inside show.ejs)
    
03: 
                                        Creating review 
    --------------------------------------------------------------------------------------------
    ## Now we need to submit the review form 
    ## POST/campgrounds/:id/reviews --> using this route we submit the review form
    ## Now create this route and check its working or not
    ## Now require review model
    ## write code for add a review inside this route
    ## we added this review with the perticular campground  

04: 
                                        Validating Reviews
    --------------------------------------------------------------------------------------------
    ## So we first do client side validation using bootstrap (like we done before)
       -add required to fiels 
       -add 'novalidate' to form 
       -add a class="needs-validation"
       -add div for a message

    ## Now we do server side validation using joi then do CRUD in data base 
    ## add reviewSchema using joi inside schema.js and export it and require it in this page
    ## create validation middleware func and pass it to route as a 2nd parameter

 
05: 
                                    Displaying Reviews
    --------------------------------------------------------------------------------------------
    ## So we are now show reviews on the same page we are created them using form
    ## first we need to populate reviews in show route before passing 'specificCampground' obj to show page
    ## now we show reviews (check show page)    


06: 
                                    styling Reviews
    --------------------------------------------------------------------------------------------
    ## We are now Styling show page and make it look little decent
    ## We just add grid and card on reviews 
    ## just look at show.ejs

    
07: 
                                    Deleting Reviews
    --------------------------------------------------------------------------------------------
    ## We want to delete a perticular review here
    ## so we set the Delete route --> Delete/campgrounds/:id/reviews/:reviewID
    ## in this route we delete specfic review and also update campground by removing those deleted review/reviews ObjectID
    ## in show.ejs lets add a delete form
    ## Now write logic in Delete/campgrounds/:id/reviews/:reviewID route

    ## 2 things should be remember
         -delete review
         -delete reference of this review to campgrounds. so update campgrounds when deleting any reviews 


08: 
                            Delete Campgrounds using mongoose middleware
    --------------------------------------------------------------------------------------------
    ## We previously created delete route for delete any campgrounds but now as it has
       a relationship with reviews, if any campground is deleted we should delete reviews 
       also which is associated with that campground
    ## Now we create a mongoose middleware inside campground.js under model folder
    ## we write code for delete both reviews that associated with and campground 




                            YelpCamp_Restructuring & flash (New Folder)
    --------------------------------------------------------------------------------------------


01: 
                            separating campgrounds routes
    --------------------------------------------------------------------------------------------
    ## first create Route folder and create a campgrounds.js file
    ## cut the campground routes to that campgrounds.js file and export it 
    ## require cacampgrounds.js file here
    ## we need to carefull when cut because we need to require things and also path should be modified


02: 
                            separating reviews routes
    --------------------------------------------------------------------------------------------
    ## create a reviews.js file
    ## cut the reviews routes to that reviews.js file and export it 
    ## require reviews.js file here
    ## we need to carefull when cut because we need to require things and also path should be modified
    
    ## const router = express.Router({mergeParams:true})
       need to mergeParams in order to find the :id 
       because it is separated 


03:       
                            Serving static Assets (public directory)
    ----------------------------------------------------------------------------------------------
    ## Now we create out public folder
    ## app.use(express.static(path.join(__dirname,'public')))       //Serving static Assets (public directory)
       serve it to the middleware
    ## create js,css folder under public and create files, write code inside it
    
    ## We separated out client side validation script which we copied from bootsrtap
    ## We cut this from boilerplate into javascript/clientSideValidation.js file under pubic folder
       and then add a link into boilerplate 



04:       
                                    Configuring Session
    ----------------------------------------------------------------------------------------------
    ## npm i express-session
    ## require it and execute it as a middleware
    ## We create session to use flash or other things
    ## Session is used in authentication
    ## We provide session cookie as 7 days maxAge
       Date.now() --> return milisecond
       Date.now() + 1000 *  60  * 60 * 24 * 7  --> 7 days
                    ----    --    --   --   --  
                    second  min  hour  day  7day




05:       
                                    Setting up flash
    ----------------------------------------------------------------------------------------------
    ## npm i connect-flash 
    ## require it and execute it as a middleware
    ## now do req.flash('key','value') --> in anywhere before redirect that requires a pop up one time message 
    ## setting up flash middleware


    
06:       
                                    Flash successMessage Partial
    ----------------------------------------------------------------------------------------------
    ## create a 'flash.ejs' under 'partials' folder 
    ## copy code for alert from bootstrap and make changes or add logic
    ## include this partials (flash.ejs) to the boilerplate 
    
    ## Now add flash message in appropiate posiosion (before redirect)
    ## req.flash('success','Successfully Created A new Campground')        //message key is 'success'
       We add this flash message in appropiate place.
                (Usially before redirect)


06:       
                                    Flash errorMessage Partial
    ----------------------------------------------------------------------------------------------
    ## same as successMessage we do it 
    ## req.flash('error','Couldnot find that campground')
       do this in appropiate place
       (usually when id is not found then flash a message)


*/