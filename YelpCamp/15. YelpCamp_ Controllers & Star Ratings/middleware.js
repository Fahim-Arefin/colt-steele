const ExpressError = require('./utils/ExpressError')        //custom error class
const {campgroundSchema,reviewSchema} = require('./validationSchemas/schema')    //destruct the key from export
const Campground = require('./model/campground')     //exports from campground.js
const Review = require('./model/review')    //exports from review.js



//this middleware is used for check if any user logged in or not
//use this middleware we protect route to access without log in
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){         //passport provide isAuthenticated() this fuct

        //store the url they are requesting
        req.session.returnTo = req.originalUrl       //returnto is lost due to connect.sid changed
                                                    //solution: u can store it on database
        req.flash('error','You must logged in')
        res.redirect('/login')
    }else{
        next()
    }
}


//validation middleware func
module.exports.validateSchema = (req,res,next) => {

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


//validation middleware func
module.exports.validateReview = (req,res,next)=>{
    const result = reviewSchema.validate(req.body)
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


//User Authorization middleware
module.exports.isAuthor = async (req,res,next)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)    
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

// Review User Authorization middleware
module.exports.isReviewAuthor = async (req,res,next)=>{
    const {id,reviewID} = req.params 
    const review = await Review.findById(reviewID)    
    console.log(review)
    if(!review.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}


//isAuthenticated() is checking if any user logged in or not 
