const express = require('express')
const router = express.Router()

//middleware

//this middleware is used by below all routers
router.use((req,res,next)=>{
    if(req.query.isAdmin){
        next()
    }
    res.send('Sorry not an Admin')
})


//routes
router.get('/topsecret',(req,res)=>{
    res.send('This is top secret')
})

router.get('/deleteAll',(req,res)=>{
    res.send('Deleted All')
})

module.exports = router