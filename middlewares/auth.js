const authService = require('../services/authServices');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const user = authService.verifyToken(authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};