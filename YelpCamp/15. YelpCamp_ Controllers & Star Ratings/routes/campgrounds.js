const express = require('express')
const router = express.Router()

const {isLoggedIn,validateSchema,isAuthor} = require('../middleware')

const campgreounds = require('../controllers/campgrounds')

//middleware
//moved to middleware.js file

/* 

//Before Restructure routes with fency ways
-------------------------------------------------
//All  routes

//index
router.get('/',campgreounds.index)

//New
router.get('/new',isLoggedIn,campgreounds.renderNewForm)

//Create
router.post('/',isLoggedIn,validateSchema,campgreounds.createCampground)

//show
router.get('/:id',campgreounds.showCampground)

//Edit 
router.get('/:id/edit',isLoggedIn,isAuthor,campgreounds.renderEditForm)

//patch
router.patch('/:id',isLoggedIn,isAuthor,validateSchema,campgreounds.updateCampground)

router.delete('/:id',isLoggedIn,isAuthor,campgreounds.deleteCampground)

*/


//All  routes

router.route('/')
    .get(campgreounds.index)  //index
    .post(isLoggedIn,validateSchema,campgreounds.createCampground)  //Create

//New
router.get('/new',isLoggedIn,campgreounds.renderNewForm)


router.route('/:id')
    .get(campgreounds.showCampground)       //show
    .patch(isLoggedIn,isAuthor,validateSchema,campgreounds.updateCampground)    //patch
    .delete(isLoggedIn,isAuthor,campgreounds.deleteCampground)  //delete

//Edit 
router.get('/:id/edit',isLoggedIn,isAuthor,campgreounds.renderEditForm)

module.exports = router


/*


01:       
                                    YelpCamp Controllers
    ----------------------------------------------------------------------------------------------
    ## We follow MVC 
    ## We move all the logic to controllers so that our route is clear and easy to look at



*/ 