//now we send actual respond to user in browser by res.send() func

const express = require('express');
const app = express()

app.use((req, res)=>{     //req,res are two object 

    console.log('We Got A New Request');   //this response show on bash 
                                          //but still browser is waiting for response


    res.send('We got your request. Here is your respond data'); //this will finally send respond to browser/user
    
    
    // res.send({color:'red',author:'fahim'})           //we can send a json formatted data also 
    // res.send('Here is your <b>respond</b> data')     //we can also send html formate
})

app.listen(8080,()=>{

    console.log('Server Started : ')
    console.log('Listening On The Port 8080 : ')

})


/*
    --- app.use() ---
    
    it is send any response like get/post/put/delete
    send() func is like return call. once send() activate below code is ignored

*/