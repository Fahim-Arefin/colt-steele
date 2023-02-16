const express = require('express')
const router = express.Router({mergeParams:true})   //need to use mergeParams to detect :id whicj is separated inside app.js 

const reviews = require('../controllers/reviews')

const {isLoggedIn,validateReview,isReviewAuthor} = require('../middleware')

//middleware
//moved into middleware.js file

//All routes
// --------------------------------
//Review submit route
router.post('/',isLoggedIn,validateReview,reviews.createReview)

//delete a perticular review
router.delete('/:reviewID',isLoggedIn,isReviewAuthor,reviews.deleteReview)



module.exports = router

/*

01:       
                                    YelpCamp Controllers
    ----------------------------------------------------------------------------------------------
    ## We follow MVC 
    ## We move all the logic to controllers so that our route is clear and easy to look at

*/