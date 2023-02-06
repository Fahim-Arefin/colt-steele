const joi = require('joi')
module.exports.campgroundSchema = joi.object({
    camp: joi.object({                          //camp should be a obj and its also required (under this our all the keys are compact as we do it in html)
        title: joi.string().required(),         //title should be a str and its also required
        image: joi.string().required(),         //image should be a str and its also required
        price: joi.number().required().min(0),  //price should be a number and its also required and also be equal or higher than zero
        description: joi.string().required(),   //description should be a str and its also required
        location: joi.string().required()       //location should be a str and its also required
    }).required()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        body: joi.string().required(),
        rating: joi.number().required().min(1).max(5) 
    }).required()
})
