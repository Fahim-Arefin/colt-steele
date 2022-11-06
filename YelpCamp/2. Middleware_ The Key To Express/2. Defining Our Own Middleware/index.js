const express = require('express')
const morgan = require('morgan')

const app = express()

app.listen(8001,()=>{
    console.log('Server started at Port 80: ')
})

//midleware
// ======================================================

//build in middleware 
app.use(morgan('dev'))          

//defining our own middleware (chaining middleware)

// //first middleware
// app.use((req,res,next)=>{                   
//     console.log('My First Middleware')
//     next()    //calling second middleware
// })

// //second middleware
// app.use((req,res,next)=>{   
//     console.log('My Second Middleware')
//     next()   //calling third middleware
//     console.log('My Second Middleware After calling next')  //this line activate in the end but we do not write code after next() call
// })

// //third middleware
// app.use((req,res,next)=>{
//     console.log('My Third Middleware')
//     next()   //then calling below any route(app.get/app.post...) 
//              //if we dont call this 'next()' no route will activate even if it is valid route 
// })


//first middleware
app.use((req,res,next)=>{                   
    console.log('My First Middleware')
    return next()    //calling second middleware
})

//second middleware
app.use((req,res,next)=>{   
    console.log('My Second Middleware')
    return next()   //calling third middleware
    console.log('My Second Middleware After calling next')  //this line now will not execute anymore
})

//third middleware
app.use((req,res,next)=>{
    console.log('My Third Middleware')
    return next()   //then calling below any route(app.get/app.post...) 
                    //if we dont call this 'next()' no route will activate even if it is valid route 
})



// ======================================================


//All route
app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.get('/dog',(req,res)=>{
    res.send('Dog is barking')
})

app.get('/cat/eat',(req,res)=>{
    res.send('cat is eating')
})

/*
                control flow of avobe Middleware
------------------------------------------------------------------
--> every request activates all middlewares(one by one)
--> 'app.use()' we write middleware function codes here
--> All app.use() middleware activates one by one (ensure chaining by adding add next() in the last line)
--> 'next()' calls next middleware 
--> ensure 'next()' must be the last line 
--> if something is below 'next()' will be executed eventually but we do not want it 
    so we can use return keyword 'return next()'


    Request     -------->  All Middleware (one by one) -------->   Respond (hit a route then it will respond)
*/