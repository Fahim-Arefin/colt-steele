const express = require('express')
const router = express.Router()

const Campground = require('../model/campground')     //exports from campground.js
const {campgroundSchema} = require('../validationSchemas/schema')    //destruct the key from export

const {isLoggedIn} = require('../middleware')

const ExpressError = require('../utils/ExpressError')        //custom error class

//middleware

//validation middleware func
const validateSchema = (req,res,next) => {

    //below code is separated in to validation folder for reuse

    // const campgroundSchema = joi.object({
    //     camp: joi.object({                          //camp should be a obj and its also required (under this our all the keys are compact as we do it in html)
    //         title: joi.string().required(),         //title should be a str and its also required
    //         image: joi.string().required(),         //image should be a str and its also required
    //         price: joi.number().required().min(0),  //price should be a number and its also required and also be equal or higher than zero
    //         description: joi.string().required(),   //description should be a str and its also required
    //         location: joi.string().required()       //location should be a str and its also required
    //     }).required()
    // })

    const result = campgroundSchema.validate(req.body)
    // console.log(result)

    if (result.error) {       //if any error occurs result have the error key
        errorArray = result.error.details       //its a arrays of object
        msg = errorArray.map((e) => {
            return e.message
        }).join(',')    //if more than one obj inside this errorArray
        throw new ExpressError(msg, 400)
    }else{
        next()  //this is very important
    }
}


//All  routes

//index
router.get('/', async (req, res, next) => {
    try {
        const campgrounds = await Campground.find({})
        // console.log(campgrounds)
        res.render('campgrounds/index', { campgrounds })
    } catch (e) {
        next(e)
    }
})

//New
router.get('/new',isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})

//Create
router.post('/',isLoggedIn,validateSchema, async (req, res, next) => {       //validate midddleware function is passed as a 2nd perameter 
    try {
        // if(!req.body.camp){
        //     throw new ExpressError('Using post man to avoid required input?? lol , Caught you !!',400)
        // }

        const camp = new Campground(req.body.camp)
        await camp.save()
        req.flash('success','Successfully Created A new Campground')        //message key is 'success'
        res.redirect(`/campgrounds/${camp._id}`)   //get req by default
    } catch (e) {
        next(e)     //passing error to error handling middleware
    }
})

//show
router.get('/:id', async (req, res, next) => {          //shobar last e rakhbo noile onno route e conflict korbe
    try {
        const { id } = req.params
        const specificCampground = await Campground.findById(id).populate('reviews')
        if(!specificCampground){
            req.flash('error','Couldnot find that campground')
            res.redirect('/campgrounds')
        }else{
            res.render('campgrounds/show', { specificCampground })
        }
    } catch (e) {
        next(e)
    }

})

//Edit 
router.get('/:id/edit',isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params
        const specificCampground = await Campground.findById(id)
        if(!specificCampground){
            req.flash('error','Couldnot find that campground')
            res.redirect('/campgrounds')
        }else{
            res.render('campgrounds/edit', { specificCampground })
        }
    } catch (e) {
        next(e)
    }

})

//patch
router.patch('/:id',isLoggedIn,validateSchema, async (req, res, next) => {    //validate midddleware function is passed as a 2nd perameter 
    try {
        const { id } = req.params
        const updatedProduct = await Campground.findByIdAndUpdate(id, { ...req.body.camp }, { runValidators: true, new: true })
        req.flash('success','Successfully Updated A Campground')        //message key is 'success'
        res.redirect(`/campgrounds/${updatedProduct._id}`)   //get req by default
    } catch (e) {
        next(e)
    }

    //{...req.body.camp} -->all data is grouped inside 'camp' object (edit.ejs) then we spread it when pass
    //camp[location],camp[title] ---> grouping data inside a 'camp' object (edit.ejs)
})

router.delete('/:id',isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params
        await Campground.findByIdAndDelete(id)
        req.flash('success','Successfully Deleted A Campground')        //message key is 'success'
        res.redirect('/campgrounds')
    } catch (e) {
        next(e)
    }

})


module.exports = router