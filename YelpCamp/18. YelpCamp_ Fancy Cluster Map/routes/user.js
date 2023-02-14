const express = require('express')
const router = express.Router()
const passport = require('passport')

const users = require('../controllers/users')

/* 

//Before Refactoring with fency ways


//register form
router.get('/register',users.renderRegisterForm)

//register
router.post('/register',users.register)

//login form
router.get('/login',users.renderLoginForm)

//login 
//passport.authenticate() with do the work
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),users.login)

//logout
router.get('/logout',users.logout)

*/


router.route('/register')
    .get(users.renderRegisterForm)  //register form
    .post(users.register)           //register


router.route('/login')
    .get(users.renderLoginForm) //login form
    .post(passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), users.login)   //login 
                    // (passport.authenticate() with do the work)

//logout
router.get('/logout', users.logout)




module.exports = router


/*

01:       
                                    YelpCamp Controllers
    ----------------------------------------------------------------------------------------------
    ## We follow MVC 
    ## We move all the logic to controllers so that our route is clear and easy to look at


    
02:       
                                A fency way of restructure routes
    ----------------------------------------------------------------------------------------------

        ## We group our common routes into 'router.route()' 
*/