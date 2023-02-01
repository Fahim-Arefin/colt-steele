const express = require('express')
const session = require('express-session')

const app = express()

//session excute
// app.use(session({secret: 'thisisnotagoodsecret'}))   //after execution we now use req.session property
sessionOption ={
    secret:'thisisnotagoodsecret',  //secret just like cookies
    resave:false,                   //for remove warning
    saveUninitialized:true         //for remove warning
}
app.use(session(sessionOption))     //after execution we now use req.session property

app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.get('/viewcount',(req,res)=>{
    if(req.session.count){      //we can add any property to session object
        req.session.count+=1
    }else{
        req.session.count=1
    }
    res.send(`You have viewed this page ${req.session.count} times`)
})


app.get('/registration',(req,res)=>{
    const {username = 'Anonymous'} = req.query
    req.session.username = username     //we can add any property to session object
    res.redirect('/greet')
})


app.get('/greet',(req,res)=>{
   const {username} = req.session       //we can destruct any property from session object
   res.send(`Welcome back ${username}`)
})

//server 
app.listen(6969,()=>{
    console.log('Server Strated at port 6969: ')
})



/*
                                Session 
----------------------------------------------------------------------
    ## Sessions are a server-side data store that we use to make
       HTTP stateful. Instead of storing data using cookies, we
       store the data on the server-side and then send the
       browser a cookie that can be used to retrieve the data .

    ## session data are stored not in the actual database,
       rather it stored somewhere for not long term.
       session then send a little cookie (id to that object) to client which is
       stored in browser to unlock that session.

    ## we need to install 'npm i express-session'
    ## requiure it to this file
    ## execute it as a middleware 'app.use(session({secret: 'thisisnotagoodsecret'}))'
       now whenever a req is coming first server send a sid(session id) as a cookie
       then any routes request will have this cookie 

    ## session (sid) remain same to a browser until its open.
    ## cookies remain there until browser is closed (by default)      

    ## nodemon (server) off kore dile session off hoye jabe kintu cookies thakbe jotokhon browser 
       on thakbe. (this is the by default behavior)

---------------------------------------------------------------------------------------------------------------
    ## How long session last???
        Ans: From ChatGPT
            The duration of a session depends on how it is implemented on the server side.
            In general, a session lasts as long as the user's session with the website. 
            This could mean until the user closes their browser, or for a set period of time determined by the website.

            For example, a website may set the session duration to 20 minutes of inactivity, 
            after which the user's session data is deleted from the server and they will have to log in again. 
            Alternatively, a website may keep the session active indefinitely, 
            as long as the user keeps their browser open and continues to interact with the website.

            The specific duration of a session is determined by the website's configuration
            and can be set on the server using various programming languages and frameworks.

    ## How long cookies last ??
        Ans: From ChatGPT
            The duration that a cookie is stored on the client side depends on 
            two factors: the "max-age" or "expires" attribute set in the cookie and the user's browser settings.
            The "max-age" or "expires" attribute is set by the website or server that creates the cookie 
            and determines the lifespan of the cookie on the client's browser. 
            For example, a cookie with a "max-age" of 3600 will last for 1 hour from the time it was created, 
            after which it will be deleted from the client's browser.

            If no "max-age" or "expires" attribute is set, the cookie is treated as a "session cookie"
            and will be deleted as soon as the user closes their browser.

            It's important to note that the user's browser settings can also affect the lifespan of a cookie. 
            For example, a user may have set their browser to automatically delete cookies when they close the browser,
            or to block all cookies. In these cases, the cookie will not be stored 
            for the duration specified by the "max-age" or "expires" attribute.

*/