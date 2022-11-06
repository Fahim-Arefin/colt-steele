//morgan logging in coming request
const express = require('express')
const app = express()

// ** Always write middleware before defining route **
//middleware    
app.use((req,res,next)=>{
    console.log(`initial request: ${req.method} ${req.path}`) 
    req.method = 'GET'          //request is changed in middle so it will always hit GET request
                                //if any post/patch/put/delete.. req is generated then in middle it
                                //will converted into GET request always 
                                //then after 'next()' call (one by one) it will hit GET request always
                                
    console.log(`Modified request: ${req.method} ${req.path}`)  
    next()
})

app.use((req,res,next)=>{
    req.requestTime = Date.now()        //adding property in the middle 
    next()
})



//server
app.listen(9090,()=>{
    console.log('Server Started: ')
    console.log('Listening on Port localhost:9090')
})

//Route
app.get('/cat',(req,res)=>{  
    console.log(`Request Time: ${req.requestTime}`)          
    res.send('GET request: meow!')
})

app.post('/cat',(req,res)=>{        //use postman to genarate 'post' request        
                                    //in this code post route will not hit ever bcz we changed all route to GET method
    console.log(`Request Time: ${req.requestTime}`)    
    res.send('POST request: meow!')
})

                //if we write middleware after server hits then it wont work
                //goal is in middle date is added but if we write code below route the it already
                //reach to route so adding or modifying or anything cant apply to original request     
        //------------------------------------------------------------------------------------------------  
                // app.use((req,res,next)=>{
                //     req.requestTime = Date.now()        
                //     next()
                // })

/* 
    In Middleware 
    --> we check authintication 
    --> we change something in middle while it is going to hit server  (req.method can be change in middle (but dont do it))
    --> we inject additional information (add request Date Time)

    ** Always write middleware before defining route **
*/