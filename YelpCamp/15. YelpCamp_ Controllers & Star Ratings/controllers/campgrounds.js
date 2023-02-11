const Campground = require('../model/campground')

module.exports.index = async (req, res, next) => {
    try {
        const campgrounds = await Campground.find({})
        // console.log(campgrounds)
        res.render('campgrounds/index', { campgrounds })
    } catch (e) {
        next(e)
    }
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.createCampground = async (req, res, next) => {       //validate midddleware function is passed as a 2nd perameter 
    try {
        // if(!req.body.camp){
        //     throw new ExpressError('Using post man to avoid required input?? lol , Caught you !!',400)
        // }

        const camp = new Campground(req.body.camp)
        camp.author = req.user._id  //req.user provided by passport which has the value of current login user 
        await camp.save()
        req.flash('success','Successfully Created A new Campground')        //message key is 'success'
        res.redirect(`/campgrounds/${camp._id}`)   //get req by default
    } catch (e) {
        next(e)     //passing error to error handling middleware
    }
}


module.exports.showCampground = async (req, res, next) => {          //shobar last e rakhbo noile onno route e conflict korbe
    try {
        const { id } = req.params
        // const specificCampground = await Campground.findById(id).populate('reviews').populate('author')
        const specificCampground = await Campground.findById(id).populate({
            path:'reviews',
            populate:{
                path:'author'
            }
        }).populate('author')
        console.log(specificCampground)
        if(!specificCampground){
            req.flash('error','Couldnot find that campground')
            res.redirect('/campgrounds')
        }else{
            res.render('campgrounds/show', { specificCampground })
        }
    } catch (e) {
        next(e)
    }
} 
module.exports.renderEditForm = async (req, res, next) => {
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
}

module.exports.updateCampground = async (req, res, next) => {    //validate midddleware function is passed as a 2nd perameter 
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
}


module.exports.deleteCampground = async (req, res, next) => {
    try {
        const { id } = req.params
        await Campground.findByIdAndDelete(id)
        req.flash('success','Successfully Deleted A Campground')        //message key is 'success'
        res.redirect('/campgrounds')
    } catch (e) {
        next(e)
    }
}