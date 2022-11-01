//Goal is to setting views directory.

const express = require('express')
const app = express()

app.listen(2222, () => {
    console.log('Server Started: ')
    console.log('Listening On Port 2222: ')
})

app.set('view engine', 'ejs')          //to use ejs we need to set it 

//below two lines used for find correctly 'views' directory whenever we execute index.js from anywhere
const path = require('path')
app.set('views',path.join(__dirname,'/views'))      //now express look views according to this path

app.get('/', (req, res) => {
    // res.send('This is home page')
    res.render('home')
})




/*

------------------------------------------------------
   ********* views directory setting instruction *********
-------------------------------------------------------

-- After the ejs config and run code then we continue below. (first see configering express for ejs)
-- Now we run code with 'nodemon index.js' and this will work fine
-- Problem is when we are not in same directory with views we expres will give error
   bcz it will not find views folder bcz it looks for views from where we execute our code.
   
    *** problem demostration ***
    -- Currentlty I m in 'setting the views directory' directory 
    -- So we can run 'nodemon index.js' then express will look views folder
       in 'setting the views directory' directory. And it will find 'views' directory
       so it can run inside's ejs file
    -- But if we are one step before this directory (cd ..) not in 'setting the views directory' 
       directory.And we run 'nodemon Setting The Views Directory/index.js' then express
       look for 'views' folder in 'Creating Dynamic HTML With Templating' 
       directory (one step behind directory name) and could not find it beacuse it is in 
       'setting the views directory' directory.then it will throw error and ejs file will not send
       rather error will send to client
       error --> (Failed to lookup view "home" in views directory "D:\Fahim Doc\colt-steele\node js\Creating Dynamic HTML With Templating\views")


-- Now to fix this problem steps are below
    
    *** problem fixing ***

    -- we should change views directory info
    -- currently express looking 'views' same level where index.js is exist
       express look 'views' in --> 'D:\\Fahim Doc\\colt-steele\\node js\\Creating Dynamic HTML With Templating\\Setting The Views Directory'\views
       (go node repl by typing (node)   
        then execute proecss.cwd()  )

    -- but need to set the path
    -- then express will look 'views' according to that path 

-- app.set('views',path.join(__dirname,'/views')) explanation below
   __dirname return where index.js is located which is 'setting the views directory' directory
   and '/views' in second perameter will be append to __dirname.
   
-- so now in everywhere we can find 'views' directory
 


*/

