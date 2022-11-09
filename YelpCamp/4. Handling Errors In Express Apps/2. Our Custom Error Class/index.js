//Define error-handling middleware functions customly with Class
const express = require('express')
const app = express()
const AppError = require('./AppError')

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
    throw new AppError('Explicitly Thrown Erorr',401)   //we throw explicitly an AppError 
                                                        //which we customly define in separate class
})

app.get('/dog', (req, res, next) => {
    console.log(`Request dateTime: ${req.dateTime}`)
    res.send('Woof! Woof!')
})

app.get('/chicken',(req,res,next)=>{
    chicken.fly()       //chicken is not defined so it will generate error
                        //this error has no status code bcz its a referense error
})

app.get('/admin',(req,res,next)=>{
    console.log(`Request dateTime: ${req.dateTime}`)
    throw new AppError('You are not admin',403)
})


app.use((err,req,res,next)=>{       //catching any kind of error, err varialble have all the err info
    const {status=500,message='something went wrong'} =err  //default values destructure
    res.status(status).send(message)        //if status undefined
                                            //then undefined.send() will create other error 
                                            //so we set status a default value
})


/*
                                Our Custom error class
                        ------------------------------------------
   -->   explicit error have status code bcz we pass status code
   -->   but other error might not have status code 

   -->   const {status=500,message='something went wrong'} =err
         explicitly error throw korle status and message update hobe
         otherwise jodi emon error genarate hoy jetay status na thake tahole 
         res.status(status).send(message) eikhane status undefined hobe so error
         generate hoye jabe tai status er default value set kore deya ache.

         ekhn jei error e create hok oita client e message & status jabe
     
*/