const express = require('express')
const app = express()

//middleware
app.use((req,res,next)=>{
    req.time = Date.now()
    next()
})

app.use('/dog',(req,res,next)=>{
    console.log('I active only for /dog route (GET,POST,PATCH...doesnot matter)')  //when any kind of request(get,post....)
                                                                                   //comes to route '/dog' then only this middleware

    next()  
})

//server
app.listen(4000,()=>{
    console.log('Server Started on localhost:4000');
})

//route
app.get('/cat',(req,res,next)=>{
    console.log(`Request time: ${req.time}`)
    res.send('GET meow!')
})

app.post('/cat',(req,res,next)=>{
    console.log(`Request time: ${req.time}`)
    res.send('POST meow!')
})
app.get('/dog',(req,res,next)=>{
    console.log(`Request time: ${req.time}`)
    res.send('GET wooff!')
})

//when all route checked and no match found then only this middleware run
app.use((req,res,next)=>{ 
    console.log(`Request time: ${req.time}`)
    // res.send('NOT FOUND') 
    res.status(404).send('NOT FOUND')   //status code set to 404 and send a message to client 
})