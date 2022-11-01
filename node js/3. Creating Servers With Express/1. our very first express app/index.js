//goal is creating a server in this file

const express = require("express")  //just like other package we also require express 
                                    //but in this case it returns a function

const app = express()  //we need to execute express function which returns a obj
// console.dir(app)    //app is a obj 


/*
This func listen on port which is given in the parameter.
After this func call my curser changes to listening stage.
We cant write anything in bash right now.
If we want to exit from listening stage/server type 'ctrl+c'.

**************************** 
In short this func listen for incomming request from user in given port number.
If user request something it will then listen it.   
In this way we just set up a 'Local' server just like xampp.
By giving 'localhost:portnumber' to crome this server starts.
*****************************
*/
app.listen(3000, () => {
    console.log('Listening On Port 3000')
})


/*
This func is respond if any kind of request is coming from user at the right port.
It doesnot matter where is it get/post or other request it will run when a request is made
so in this func we can right what is the outgoing respond to user.
*/
app.use(() => {
    console.log('We Got A New Request')
})



/*
    ********************************************
    
    -- Here we build a server which is 'listen on a port number and send response'
    -- 'listen()' is listening on a port thus it create a server 
    -- if user request something listen() func is activated also use() function is activated
    -- listen() func listening incoming request from user at a port number
    -- use() func sending respond to user.
    
    
    -- listen() func listening incoming request from user at a port number.
    -- use() func sending respond to user.
    
    ********************************************

*/