const express = require('express');
const { findAllPosts, blogPostsController,
  blogPostFindId, 
  updateBlogPost, 
  deletePostById } = require('./controllers/blogPostController');
const { allCategoriesController, 
  categorieCreatedController } = require('./controllers/categoriesController');
const { userCreatedController, loginController, 
  allUsersController, 
  UserByIdController, deleteUserMe } = require('./controllers/userController');
const auth = require('./middlewares/auth');
const { error } = require('./middlewares/errorMiddlewares');

const app = express();

app.use(express.json());

// USERS
app.post('/user', userCreatedController);
app.post('/login', loginController);
app.get('/user', auth, allUsersController);
app.get('/user/:id', auth, UserByIdController);
app.delete('/user/me', auth, deleteUserMe);

// CATEGORIES
app.post('/categories', auth, categorieCreatedController);
app.get('/categories', auth, allCategoriesController);

// BLOGPOST
app.post('/post', auth, blogPostsController);
app.get('/post', auth, findAllPosts);
app.get('/post/:id', auth, blogPostFindId);
app.put('/post/:id', auth, updateBlogPost);
app.delete('/post/:id', auth, deletePostById);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(error);
// Hello - Iniciando o Projeto :D
