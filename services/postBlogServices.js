/* const { postSchema } = require('../schemas/blogPostSchema');
const { BlogPosts, Categories } = require('../models');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest } = require('../utils/statusCode');

const verifyCategory = async (category) => {
  const categories = await Categories.findAll({ where: { id: category } });
  return categories.length === category.length;
};

const blogPostsCategories = async (req, title, content, categoryIds) => {
 // VALIDAÇÕES DO SCHEMA CATEGORIES
 const { error } = postSchema.validate({ title, content, categoryIds });

 if (error) {
   throw errorConstructor(badRequest, { message: error.message });
 }
 const { id } = req.user;

  const createBlogPost = await BlogPosts.create({ title, content, categoryIds, userId: id });
  const blog = { id: createBlogPost.id,
    userId: id,
    title,
    content,
  };

  if (await verifyCategory(categoryIds) === false) { 
    throw errorConstructor(badRequest, { message: '"categoryIds" not found' });
  }
  return blog;
};

module.exports = { blogPostsCategories }; */
