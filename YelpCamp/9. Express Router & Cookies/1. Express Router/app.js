const express = require('express')
const app = express()
const shelterRoutes = require('./routes/shelters')
const dogRoutes = require('./routes/dogs')
const adminRoutes = require('./routes/admin')


//routes                    (now we call the routes inside through middleware app.use() function)
app.use('/',shelterRoutes)  //way one
app.use('/dogs',dogRoutes)  //way two
                            //'/dogs' --> this is just like prefix. All the routes inside
                            //            dogs.js will have '/dogs' at first as prefix   
                            //            we do that to minimize dupplicate writing

app.use('/admin',adminRoutes)


//server
app.listen(5000,()=>{
    console.log('Server Started at port 5000')
})







/*
                            express router
    -------------------------------------------------------------------------------
    ## A router object is an isolated instance of middleware and routes. 
       You can think of it as a “mini-application,” capable only of performing
       middleware and routing functions. Every Express application has a built-in app router.
    ## A router behaves like middleware itself, so you can use it as an argument
       to app.use() or as the argument to another router’s use() method.
    ## The top-level express object has a Router() method that creates a new router object.
    ## Once you’ve created a router object, 
       you can add middleware and HTTP method routes (such as get, put, post, and so on) to it


    ## We are going to separate and group our Routes and middleware for that Routes in separate place.

    ## first we write routes & middleware separate pages then export it 
    ## now we requre it here and use them
    ## We can use them like middlewares (under app.use())



*/