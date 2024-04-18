const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().trim().required().messages({
            'string.empty': 'Title is required.',
            'string.base': 'Title must be a string.'
        }),
        description: Joi.string().trim().required().messages({
            'string.empty': 'Description is required.',
            'string.base': 'Description must be a string.'
        }),
        country: Joi.string().trim().required().messages({
            'string.empty': 'Country is required.',
            'string.base': 'Country must be a string.'
        }),
        location: Joi.string().trim().required().messages({
            'string.empty': 'Location is required.',
            'string.base': 'Location must be a string.'
        }),
        price: Joi.number().required().min(0),
        image: Joi.object({
            filename: Joi.string().allow("", null),
            url: Joi.string().allow("", null)
        }).allow(" ", null),
        category: Joi.string()
            .valid('trending', 'iconic_cities', 'rooms', 'boats', 'arctic', 'camping', 'beach', 'castle', 'farms', 'mountains', 'domes')
            .optional()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().trim().required().messages({
            'string.empty': 'Comment is required.',
            'string.base': 'Comment must be a string.'
        })
    }).required()
});
