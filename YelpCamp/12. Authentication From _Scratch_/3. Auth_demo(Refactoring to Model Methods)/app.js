const express = require('express')
const path = require('path')
const app = express()
const User = require('./models/user')
const bcrypt = require('bcrypt')
const session = require('express-session')

const mongoose = require('mongoose')

mongoose.set('strictQuery', true);  //for remove console warning

mongoose.connect('mongodb://localhost:27017/AuthDemo') //connected to YelpCamp database
    .then(() => {
        console.log('Mongo connnection successful: ')
    })
    .catch((e) => {
        console.log('Mongo connection failed !!')
        // console.log(e)
    })


//ejs setup & path
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }))     // for parsing application/x-www-form-urlencoded

sessionOption = {
    secret: 'thisisnotagoodsecret',  //secret just like cookies
    resave: false,                   //for remove warning
    saveUninitialized: true         //for remove warning
}
app.use(session(sessionOption))


//checking if any user is logged in or not
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        //if no one is logged in then they redirect to login       
        res.redirect('/login')
    } else {
        //if someone is logged in 
        next()
    }
}


//server
app.listen(5000, () => {
    console.log('Server Started at port 5000:')
})

//Routes

//home
app.get('/', (req, res) => {
    res.send('This is Home Route')
})

//registration form
app.get('/register', (req, res) => {
    res.render('register')
})

//login form
app.get('/login', (req, res) => {
    res.render('login')
})

//Authenticate user (login)
app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (user) {
        const validUser = await bcrypt.compare(password, user.password)  //return true/false
        if (validUser) {
            req.session.user_id = user._id  //inserting user_id into session object  
            res.redirect('/secret')
        } else {
            res.redirect('/login')
        }
    } else {
        res.send('username missmatch')
    }

})

//create user (registration)
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
        username,       //username:username  --> shorthand username 
        password: hashedPassword
    })
    await user.save()
    req.session.user_id = user._id
    res.redirect('/')
})

app.post('/logout', (req, res) => {
    // req.session.user_id = null
    req.session.destroy()
    res.redirect('/login')
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret')
})
app.get('/topsecret', requireLogin, (req, res) => {
    res.send('Top secret')
})






/*


        Auth_Demo (We cut some logic to Model as 'static methods and mongoose middleware')
------------------------------------------------------------------------------------------------------
    ## first install 'npm i express ejs mongoose bcrypt'
    ## Create models and views directory
    ## create app.js 
    ## create user.js under models folder
    ## create user model inside user.js and export it 
    ## require user.js model inside app.js
    ## create server


    ## write code for registration and create appropiate route
    ## write code for login and create appropiate route

    ## npm i ecpress-session 
    ## require and execute session 
    ## now ensure stay logged in with session 


    ## req.session.destroy() --> use this for logout

                    ***********************************
        We cut some logic to Model as 'static methods and mongoose middleware'
                    ***********************************
    

*/