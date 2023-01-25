//Define error-handling middleware functions customly
const express = require('express')
const app = express()

//middleware
app.use((req, res, next) => {
    req.dateTime = Date.now()
    next()
})

//server
app.listen(5000, () => {
    console.log('Server Started on localhost:5000');
})


//route
app.get('/', (req, res, next) => {
    console.log(`Request dateTime: ${req.dateTime}`)
    res.send('Home Page')
})

app.get('/error', (req, res, next) => {
    console.log(`Request dateTime: ${req.dateTime}`)
    throw new Error('Explicitly Thrown Erorr')     
})

app.get('/secret', (req, res, next) => {
    console.log(`Request dateTime: ${req.dateTime}`)
    chicken.fly()   //chicken is undefined so it will throw error
})

app.get('/dog', (req, res, next) => {
    console.log(`Request dateTime: ${req.dateTime}`)
    res.send('Woof! Woof!')
})

// app.use((err, req, res, next) => {   //Define error-handling middleware functions, should be last thing
//                                      //Now no stack trace is shown rather this 3 line print in console
//                                      //and also a message is sent back to client 
//     console.log('*******************************************')
//     console.log('***************Error***********************')
//     console.log('*******************************************')
//     res.send('I run if any kind of error occur')
// })
app.use((err, req, res, next) => {   //Define error-handling middleware functions, should be last thing
                                     //Now no stack trace is shown rather this 3 line print in console
                                     
    console.log('*******************************************')
    console.log('***************Error***********************')
    console.log('*******************************************')
    next(err)                       //err contains what is causing error and all the stack trace
                                    //next(err) --> we are passing err to the next err handling middleware
                                    //here nothing is next so err pass to the default err handler
})



/*
                        Define error-handling middleware functions
                        ------------------------------------------
   -->  Define error-handling middleware functions in the same way as other middleware functions, 
        except error-handling functions have four arguments instead of three: (err, req, res, next)

   -->  **You define error-handling middleware last, after other app.use() and routes calls**

   -->  app.use((err,req,res,next)=>{   
        console.log('*******************************************')
        console.log('***************Error***********************')
        console.log('*******************************************')
        res.send('I run if any kind of error occur')
        })

        here we define a simple middleware which is just printing 4 line
        now no stack trace or default error message will not be shown bcz we define 
        our error handler middleware


    next      --> we are calling the next middleware
    next(err) --> we are passing err to the next err handling middleware
*/