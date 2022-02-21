const { blogPosts, findAllPostCategories } = require('../services/postBlogServices');
const { created, sucess } = require('../utils/statusCode');

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

const findAllPosts = async (_req, res, next) => {
  try {
    const findPostAll = await findAllPostCategories();
    return res.status(sucess).json(findPostAll);
  } catch (error) {
   next(error);
  }
};

module.exports = { blogPostsController, findAllPosts };