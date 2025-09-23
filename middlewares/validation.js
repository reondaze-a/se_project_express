const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.error('string.uri');
};

const celebrateTests = {
  // POST /signin
  signIn: celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required().messages({
        'string.email': 'The "email" field must be a valid email address',
        'string.empty': 'The "email" field must be filled in',
        'any.required': 'The "email" field is required',
      }),
      password: Joi.string().min(8).required().messages({
        'string.min': 'The minimum length of the "password" field is 8',
        'string.empty': 'The "password" field must be filled in',
        'any.required': 'The "password" field is required',
      }),
    }),
  }),

  // POST /signup
  signUp: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required().messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.empty': 'The "name" field must be filled in',
        'any.required': 'The "name" field is required',
      }),
      // use custom URL validator for consistent messaging
      avatar: Joi.string().required().custom(validateURL).messages({
        'string.empty': 'The "Avatar" field must be filled in',
        'string.uri': 'The "Avatar" field must be a valid url',
        'any.required': 'The "Avatar" field is required',
      }),
      email: Joi.string().email().required().messages({
        'string.email': 'The "Email" field must be a valid email address',
        'string.empty': 'The "Email" field must be filled in',
        'any.required': 'The "Email" field is required',
      }),
      password: Joi.string().min(8).required().messages({
        'string.min': 'The minimum length of the "Password" field is 8',
        'string.empty': 'The "Password" field must be filled in',
        'any.required': 'The "Password" field is required',
      }),
    }),
  }),


  // id params tests
  idTest: celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required().messages({
        'string.hex': 'The "itemId" must be hexadecimal',
        'string.length': 'The "itemId" must be 24 characters long',
        'string.empty': 'The "itemId" field must be filled in',
        'any.required': 'The "itemId" field is required',
      }),
    }),
  }),

  itemIdTest: celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'The "itemId" must be hexadecimal',
        'string.length': 'The "itemId" must be 24 characters long',
        'string.empty': 'The "itemId" field must be filled in',
        'any.required': 'The "itemId" field is required',
      }),
    }),
  }),


  // POST /items
  postItemTest: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.empty': 'The "name" field must be filled in',
        'any.required': 'The "name" field is required',
      }),
      imageUrl: Joi.string().required().uri().messages({
        'string.empty': 'The "imageUrl" field must be filled in',
        'string.uri': 'The "imageUrl" field must be a valid url',
        'any.required': 'The "imageUrl" field is required',
      }),
      weather: Joi.string().valid('hot', 'warm', 'cold').required().messages({
      'any.only': 'The "weather" field must be one of: hot, warm, cold',
      'string.empty': 'The "weather" field must be filled in',
      'any.required': 'The "weather" field is required',
      }),
    }),
  }),

  profileUpdateTest: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.empty': 'The "name" field must be filled in',
        'any.required': 'The "name" field is required',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        'string.empty': 'The "Avatar" field must be filled in',
        'string.uri': 'The "Avatar" field must be a valid url',
        'any.required': 'The "Avatar" field is required',
      }),
    })
  })
};

module.exports = { celebrateTests };
