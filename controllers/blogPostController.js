const { blogPostsCategories } = require('../services/postBlogServices');
const { created } = require('../utils/statusCode');

const blogPostController = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const createBlog = await blogPostsCategories(title, content, categoryIds, id);
    return res.status(created).json(createBlog);
  } catch (err) {
    next(err);
  }
};

module.exports = { blogPostController };