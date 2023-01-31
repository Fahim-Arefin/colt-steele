const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())

//routes
app.get('/greet',(req,res)=>{
    // console.log(req.cookies)    //every req to any route also sent the cookies 
                                //so we can see cookies on req

    const {name='No-Name'} = req.cookies    
    res.send(`Hey There ${name} !!`)
})

app.get('/setname',(req,res)=>{
    res.cookie('name','Fahim Arefin') 
    res.cookie('job','No Job') 
    res.send('Cookie has been sent !!')
})


//server
app.listen(4000,()=>{
    console.log('Server Started at port 4000')
})

/*
                        Cookies
--------------------------------------------------------------
    ## Cookies sent by server that stored users browser 
       then if user any time sent any http req to that server 
       this cookies autometically sent to that http request  
    
    ## We can see cookies that stored to our browser 
       ubder Application (crome dev tool)

    ## Cookies will stored even if we close browser 
    
    ## User any time any route e http req pathale ei cookies gulao autometic req e add hoye jabe


    ## We have to install 'npm i cookie-parser' to parse cookies
    ## then require it 
    ## then execute it app.use(cookieParser()) 
    ## then use 'req.cookies' to parse cookies

    ## Basically cookie is used to add some statefullness to the request
       


*/ 
