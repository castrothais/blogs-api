const { blogPosts, findAllPostCategories, 
  findBlogPostId, 
  updatePost, 
  deletePostId } = require('../services/postBlogServices');
const { created, sucess, noContent } = require('../utils/statusCode');

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

const blogPostFindId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findPostId = await findBlogPostId(id);
    return res.status(sucess).json(findPostId);
  } catch (error) {
    next(error);
  }
};

const updateBlogPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.params;
    const { email } = req.user;
    
    const data = { id, title, content, categoryIds, email };
    const post = await updatePost(data);
    return res.status(sucess).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.user;

    await deletePostId(id, email);
    return res.status(noContent).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = { blogPostsController, 
  findAllPosts, 
  blogPostFindId, 
  updateBlogPost, 
  deletePostById };