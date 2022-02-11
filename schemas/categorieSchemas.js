const Joi = require('joi');

const categorieSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '"name" is required',
  }),
});

module.exports = { categorieSchema };