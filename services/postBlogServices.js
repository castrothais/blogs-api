const { BlogPosts, Categories, Users } = require('../models');
const { validatePost, updateSchema } = require('../schemas/blogPostSchema');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, notFound, unauthorized } = require('../utils/statusCode');

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

const updatePost = async (data) => {
  // Variável devido o lint reclamando
  // Async arrow function has too many parameters (5). Maximum allowed is 4
  const { id, title, content, categoryIds, email } = data;

  const { error } = updateSchema.validate({ title, content });
  if (error) throw errorConstructor(badRequest, { message: error.message });

  const findPost = await BlogPosts.findByPk(id);
  if (!findPost) throw errorConstructor(notFound, { message: 'Post does not exist' });

  const user = await Users.findOne({ where: { email } });

  const { dataValues: { userId: UserIdInPost } } = findPost;
  const { dataValues: { id: UserIdInUser } } = user;
  
  // Somente o usuário que criou o post poderá editá-lo.
  if (UserIdInPost !== UserIdInUser) {
    throw errorConstructor(unauthorized, { message: 'Unauthorized user' });
  } 
  
  // Só será possível editar o título ou o conteúdo de um post.
  if (categoryIds) throw errorConstructor(badRequest, { message: 'Categories cannot be edited' });

  await BlogPosts.update({ title, content }, { where: { id } });

  const post = await BlogPosts.findByPk(id, { 
      attributes: { exclude: ['id', 'published', 'updated'] },
      include: { association: 'categories', through: { attributes: [] } },
    });

  return post;
};

module.exports = { blogPosts, findAllPostCategories, findBlogPostId, updatePost };
