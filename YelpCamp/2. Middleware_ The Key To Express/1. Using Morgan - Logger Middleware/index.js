const express = require('express')
const morgan = require('morgan')

const app = express()

app.listen(8001,()=>{
    console.log('Server started at Port 8001: ')
})

//midleware
// ======================================================

// app.use(morgan('tiny'))
app.use(morgan('dev'))        //console e output dekhbo (npm package e giye Doc pore dekhbo)
                               //url timeout hoye jabe na bcz build in ei middleware e next() middleware chain kora ache 
                               //and eventually clint e respose jay bcz routing(app.get/app.post...) o one kind of middleware

// app.use(()=>{
//     console.log('I run on every single request') //console e output dekhte parbo. prottek req er jonnoi eita print hobe
                                                    //url ghurte ghurte timeout hoye jabe bcz amra ekhan theke next kono middleware
                                                    //call deinai or kisu send korinai client er kache    
// })

// ======================================================
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
                Express Middleware
---------------------------------------------------
--> 'app.use()' er moddhe ja likhbo ta j kono request er jonno activate hobe
    'app.use()' middleware hishebe kaj kore 
    'app.use()' get/post/../valid/invalid all types of req er jonno ei function activate hoy

 ** basically in the middleware amra kichu functionality inject kore dei jeta any request ei active hoy **

*/