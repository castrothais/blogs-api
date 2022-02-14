const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': '"title" is required',
  }),
  content: Joi.string().empty().required().messages({
    'any.required': '"content" is required',
    'string.empty': '"content" is required',
  }),
  categoryIds: Joi.array().empty().required().messages({
    'any.required': '"categoryIds" is required',
  }),
});

module.exports = { postSchema };