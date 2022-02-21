const { BlogPosts, Categories } = require('../models');
const { validatePost } = require('../schemas/blogPostSchema');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest } = require('../utils/statusCode');

const verifyCategory = async (category) => {
  const categories = await Categories.findAll({ where: { id: category } });
 
  return categories.length === category.length;
};

const blogPosts = async (title, content, categoryIds, userId) => {
    // VALIDAÇÕES DO SCHEMA CATEGORIES
    const { error } = validatePost(title, content, categoryIds);
    if (error) throw errorConstructor(badRequest, { message: error.message });
    
    const verifyCategorie = await verifyCategory(categoryIds);
     if (verifyCategorie === false) {
       throw errorConstructor(badRequest, { message: '"categoryIds" not found' });
     }
  
    const createBlogPost = await BlogPosts.create({ title, content, userId });
      return createBlogPost;
}; 

module.exports = { blogPosts };
