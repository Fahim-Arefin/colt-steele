//Goal is to configer EJS (Embedded Javascript Object)

const express = require('express')
const app = express()

app.listen(1111,()=>{
    console.log('Server Started: ')
    console.log('Listening On Port 1111: ')
})

app.set('view engine','ejs')          //to use ejs we need to set it 

app.get('/',(req,res)=>{
    // res.send('This is home page')
    res.render('home')
})




/*

------------------------------------------------------
   ********* ejs configaration instruction *********
-------------------------------------------------------

step01: First create package.json file (npm init)
step02: Then install express package (npm install express)
step03: Start the server and check if its okay or not
step04: Start server with nodemon (nodemon filename)
step05: Now config express with EJS 
step06: For config first install EJS (npm install ejs)
step07: We need not require EJS like other package. express will handle it
step08: Then we need to set view engine to ejs by app.set() func
step09: After install express , ejs and setting view engine to ejs 
        exrpess going to assume that by default our views/template is exist in 
        'views' directory/folder 
        (we can change views directory name but by default views is used)
step10: So now create a views folder in the same directory 
        where my index.js is exist  (mkdir views) 
        
step11: Then create .ejs file inside views directory
step12: Then write code in ejs file
step13: We use res.send() to sent something to clint
        But if we want to send a ejs file to client we then replace 
        res.send() to res.render()
step14: In res.render() we pass ejs file
step15: res.render('home') --> just write the ejs file name without extension.
        bcz we set view engine to ejs
step16: res.render('views/home') --> no need to specify it bcz default place is views 
        so express will look ejs files from views folder
step17: now start the server and check if ejs is send to client or not

*/

