const Joi = require('joi');

const validatePost = (title, content, categoryIds) => {
  const postSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': '"title" is required',
      'any.required': '"title" is required',
    }),
    content: Joi.string().empty().required().messages({
      'string.empty': '"content" is required',
      'any.required': '"content" is required',
    }),
    categoryIds: Joi.array().empty().required().messages({
      'any.required': '"categoryIds" is required',
    }),
  });

  return postSchema.validate({ title, content, categoryIds });
};

const updateSchema = Joi.object({
  title: Joi.string().required().messages({
  'any.required': '"title" is required',
}),
  content: Joi.string().required().messages({
  'any.required': '"content" is required',
}),
});

module.exports = { validatePost, updateSchema };