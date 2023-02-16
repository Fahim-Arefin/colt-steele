const express = require('express')
const router = express.Router()

const {isLoggedIn,validateSchema,isAuthor} = require('../middleware')

const campgreounds = require('../controllers/campgrounds')


//image
const {storage} = require('../cloudinaryConfig')
const multer  = require('multer')

// const upload = multer({ dest: 'uploads/' })     //for memory space but we use cloud space later
const upload = multer({storage})     //multer will upload image in storage that we defined in cloudinary

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
    // // .post(isLoggedIn,validateSchema,campgreounds.createCampground)  //Create

    // //for single file upload
    // // .post(upload.single('image'),(req,res)=>{
    // //     console.log(req.body)   //all the info here except file info
    // //     console.log(req.file)   //only contails file info
    // //     res.send('it worked?!')
    // // })  //Create

    // //for multiple file upload
    // .post(upload.array('image'),(req,res)=>{    //'image' is the name of file field
    //     console.log(req.body)   //all the info here except file info
    //     console.log(req.files)   //only contails file info
    //     res.send('it worked?!')
    // })  //Create
    .post(isLoggedIn,upload.array('image'),validateSchema,campgreounds.createCampground)  //Create
    
//New
router.get('/new',isLoggedIn,campgreounds.renderNewForm)


router.route('/:id')
    .get(campgreounds.showCampground)       //show
    .patch(isLoggedIn,isAuthor,upload.array('image'),validateSchema,campgreounds.updateCampground)    //patch
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