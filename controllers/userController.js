const { createUser, userLogin, usersAllList, userGetById, 
  deleteUser } = require('../services/userServices');
const { created, sucess, noContent } = require('../utils/statusCode');

const userCreatedController = async (req, res, next) => {
 try {
   const { displayName, email, password, image } = req.body;
   const tokenUser = await createUser(displayName, email, password, image);
   return res.status(created).json({ token: tokenUser });
 } catch (err) {
   next(err);
 }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginUser = await userLogin(email, password);
    return res.status(sucess).json({ token: loginUser });
  } catch (err) {
    next(err);
  }
};

const allUsersController = async (_req, res, next) => {
  try {
    const usersAll = await usersAllList();
    return res.status(sucess).json(usersAll);
  } catch (err) {
    next(err);
  }
};

const UserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await userGetById(id);
    return res.status(sucess).json(userById);
  } catch (err) {
    next(err);
  }
};

const deleteUserMe = async (req, res, next) => {
  try {
    const { email } = req.user;
    
    await deleteUser(email);
    return res.status(noContent).json({});
  } catch (error) {
    next(error);
}
};

module.exports = { userCreatedController, 
  loginController,
allUsersController,
UserByIdController,
deleteUserMe };