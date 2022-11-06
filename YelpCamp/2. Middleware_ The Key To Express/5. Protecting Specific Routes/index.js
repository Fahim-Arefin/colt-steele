const express = require('express')
const app = express()

//middleware

//authentication route with password for any request method (get,post...)
app.use('/dog',(req,res,next)=>{        //here we can protect a route with any type of request(get,post,delete....)
                                        //but we want only GET/dog route to be protected then it will not work 
    const {password} = req.query
    if(password==='tt21sa'){
        next()
    }else{
        res.send('enter a password to know secret')
    }

    // password==='tt21sa'? next():res.send('enter a password to know secret')  //ternary operator
})

//define a middleware inside this function
const validatePassword = (req,res,next)=>{
    const {password} = req.query
    if(password==='cat2211'){
        next()
    }else{
        res.send('enter a password to know secret')
    }
    // password==='cat2211'? next():res.send('enter a password to know secret')  //ternary operator
} 



//server
app.listen(4000,()=>{
    console.log('Server Started on localhost:4000');
})

//All route
app.get('/dog',(req,res,next)=>{
    res.send('GET woof!')
})
app.post('/dog',(req,res,next)=>{       //using postman to genarate post request
    res.send('POST woof!')
})


app.get('/cat',validatePassword,(req,res,next)=>{       //authentication a specific route with password
                                                        //second argument is a middleware 
                                                        //inside validatePassword when next() is called 
                                                        //then '(req,res,next)' this activates
    res.send('GET meow!')
})
app.post('/cat',(req,res,next)=>{
    res.send('POST meow!')
})



//no route is found then its run
app.use((req,res,next)=>{
    res.status(404).send('NOT FOUND')  
})


/*
    key things
--------------------------
only route validation ignore method type then             -->   use 'app.use()'
validation specific route and not ignore method type rhen -->   pass a middleware func as second parameter of that specific route 


app.get('/cat',validatePassword,(req,res,next)=>{}
---------------------------------------------------
validatePassword is a func which defines a middleware
inside validatePassword when next() is called then '(req,res,next)' this activates
only GET/cat is validated not POST/cat or any other method with same route


use this-->  http://localhost:4000/dog?password=tt21sa
use this-->  http://localhost:4000/cat?password=cat2211
*/