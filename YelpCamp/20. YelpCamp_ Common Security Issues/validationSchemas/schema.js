const baseJoi = require('joi')
const sanitizeHTML = require('sanitize-html')   

//Cross Site Scriping protection
const extention = (joi)=>({
    type:'string',
    base: joi.string(),
    messages:{
        'string.escapeHTML':'{{#label}} must not include HTMl'
    },
    rules:{
        escapeHTML:{
            validate(value,helpers){
                const clean = sanitizeHTML(value,{
                    allowedTags:[],
                    allowedAttributes:{}
                });
                if(clean !==value) return helpers.error('string.escapeHTML',{value})
                return clean
            }
        }
    }
})

const joi = baseJoi.extend(extention)

module.exports.campgroundSchema = joi.object({
    camp: joi.object({                          //camp should be a obj and its also required (under this our all the keys are compact as we do it in html)
        title: joi.string().required().escapeHTML(),         //title should be a str and its also required
        // image: joi.string().required(),         //image should be a str and its also required
        price: joi.number().required().min(0),  //price should be a number and its also required and also be equal or higher than zero
        description: joi.string().required().escapeHTML(),   //description should be a str and its also required
        location: joi.string().required().escapeHTML()       //location should be a str and its also required
    }).required(),
    deleteImages: joi.array()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        body: joi.string().required().escapeHTML(),
        rating: joi.number().required().min(1).max(5) 
    }).required()
})
