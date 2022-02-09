const { createUser, userLogin } = require('../services/userServices');
const { created, sucess } = require('../utils/statusCode');

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

module.exports = { userCreatedController, loginController };