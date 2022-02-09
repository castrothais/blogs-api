const Joi = require('joi');

// Customizar Mensagem com JOI
// Ref: https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({ 
    'string.min': '"displayName" length must be at least 8 characters long', 
  }),
  email: Joi.string().email().required().messages({ 
    'string.email': '"email" must be a valid email',
    'any.required': '"email" is required',
  }),
  password: Joi.string().min(6).required().messages({ 
    'string.min': '"password" length must be 6 characters long',
    'any.required': '"password" is required',
  }),
  image: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().empty().required()
    .messages({
    'string.empty': '"email" is not allowed to be empty',
    'any.required': '"email" is required',

  }),
  password: Joi.string().min(6).empty().required()
  .messages({ 
    'string.min': '"password" length must be 6 characters long',
    'any.required': '"password" is required',
    'string.empty': '"password" is not allowed to be empty',
  }),
  image: Joi.string(),
});

module.exports = { userSchema, loginSchema };