const Review = require('../model/review')    //exports from review.js
const Campground = require('../model/campground')     //exports from campground.js

module.exports.createReview = async(req,res,next)=>{
    try{
        // res.send('You made it!')
        const campground = await Campground.findById(req.params.id) //id will not found if mergeParams:false
        const review = new Review(req.body.review)
        review.author = req.user._id    //currently logged in user info in the session is stored in req.user by passport
        campground.reviews.push(review)
        await review.save()
        await campground.save()
        req.flash('success','Successfully Review Given')        //message key is 'success'
        res.redirect(`/campgrounds/${campground._id}`)

    }catch(e){
        next(e)
    }
}


module.exports.deleteReview = async(req,res,next)=>{
    try{
        // res.send('delete')
        const {id,reviewID} = req.params        //id will not found if mergeParams:false
        await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewID}})   //update campgrounds by revoming reference of 
                                                                            //this newly deleted reviewID using $pull
        await Review.findByIdAndDelete(reviewID)
        req.flash('success','Successfully Deleted A Review')        //message key is 'success'
        res.redirect(`/campgrounds/${id}`)
    }catch(e){
        next(e)
    }
}