const { BlogPosts, Categories, Users } = require('../models');
const { validatePost } = require('../schemas/blogPostSchema');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, notFound } = require('../utils/statusCode');

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

const findAllPostCategories = async () => {
  const findAllPost = await BlogPosts.findAll({
    include: [
      { model: Categories, as: 'categories' },
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  return findAllPost;
};

const findBlogPostId = async (id) => {
  const findPost = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });

  if (!findPost) throw errorConstructor(notFound, { message: 'Post does not exist' });

  return findPost;
};

module.exports = { blogPosts, findAllPostCategories, findBlogPostId };
