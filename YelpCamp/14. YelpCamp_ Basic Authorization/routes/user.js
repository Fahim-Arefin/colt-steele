const express = require('express')
const router = express.Router()
const User = require('../model/user')
const passport = require('passport')


router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({                     //we created user without password
            email: email,
            username: username
        })
        const registeredUser = await User.register(user, password)
        // this register is mongoose static method which is 
        // included by passport-local-mongoose autometically
        // register method take user obj and password(second parameter)
        // and make a new user obj which has 
        // salt,hash field 
        // console.log(registeredUser)

        req.login(registeredUser,(err)=>{       //passport provide login method see docs
            if(err){
                next(err)
            }else{
                req.flash('success', 'Welcome to Yelp Camp')
                res.redirect('/campgrounds')
            }
        })
        
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

//passport.authenticate() with do the work
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res) => {
    const redirectUrl = (req.session.returnTo || '/campgrounds')   //returnto is lost due to connect.sid changed
                                                                    //solution: u can store it on database
    req.flash('success', 'Welcome to Yelp Camp')
    res.redirect(redirectUrl)
})


router.get('/logout', (req, res, next) => {
    req.logout((err) => {       //passport provide it see doc
        if (err) {
            return next(err)
        }
        req.flash('success', 'GoodBye!')
        res.redirect('/campgrounds')
    })
});

module.exports = router