const authService = require('../services/authServices');
const errorConstructor = require('../utils/errorConstructor');
const { unauthorized } = require('../utils/statusCode');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      const error = errorConstructor(unauthorized, 'Token not found');
      return res.status(401).json(error);
    }

    const user = authService.verifyToken(authorization);
    if (!user) {
      const error = errorConstructor(unauthorized, 'Expired or invalid token');
      return res.status(401).json(error);
    } 
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};