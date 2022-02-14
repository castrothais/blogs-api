const { BlogPosts, Categories, Users } = require('../models');
const { validatePost } = require('../schemas/blogPostSchema');

const verifyCategory = async (category) => {
  const categories = await Categories.findAll({ where: { id: category } });
 
  return categories.length === category.length;
};

const blogPosts = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  try {
    const { error } = validatePost(title, content, categoryIds);
    if (error) return res.status(400).json({ message: error.message });
    const verifyCategorie = await verifyCategory(categoryIds);

    if (verifyCategorie === false) {
      console.log(verifyCategorie, 'ENTROU NO VERIFY');
      return res.status(400).json({ message: '"categoryIds" not found' }); 
    }
  
  const createBlogPost = await BlogPosts.create({ title, content, userId });

    return res.status(201).json(createBlogPost);
  } catch (err) {
    return res.status(400).json(err);
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

module.exports = { blogPosts, findAllPosts };