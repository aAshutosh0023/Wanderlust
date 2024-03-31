const Joi = require('joi');

module.exports.listingSchema = Joi.object({
     
    listing: Joi.object({   //listing is the object here.
    
     title: Joi.string().required(),
     description: Joi.string().required(),
     country: Joi.string().required(),
     location: Joi.string() .required(),
     price: Joi.number().required().min(0),
     image:Joi.object({filename:Joi.string(),
                       url:Joi.string().allow("",null)}).allow(" ",null) //not required...nhi doge pic toh bhi koi naa.
    //image is also object..that contain filename and url.
        
    }).required()//listing object is required too...khali hua toh nhi chalegaa..

})
 


module.exports.reviewSchema = Joi.object({
     
    review: Joi.object({   //here listing is  also a object.
    
      rating : Joi.number().required().min(1).max(5),
      comment: Joi.string().required(),
         
    }).required() //listing object is required too...khali hua toh nhi chalegaa..

})