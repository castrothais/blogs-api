const { BlogPosts, Categories, Users } = require('../models');
const { blogPosts } = require('../services/postBlogServices');
const { created } = require('../utils/statusCode');

const blogPostsController = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const newBlogPost = await blogPosts(title, content, categoryIds, userId);
    return res.status(created).json(newBlogPost);
  } catch (err) {
    next(err);
  }
}; 

const findAllPosts = async (_req, res) => {
  try {
    const findAllPostCategories = await BlogPosts.findAll({
      include: [
        { model: Categories, as: 'categories' },
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      ],
    });
    return res.status(200).json(findAllPostCategories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { blogPostsController, findAllPosts };