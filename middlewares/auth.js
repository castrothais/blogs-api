const authService = require('../services/authServices');
const errorConstructor = require('../utils/errorConstructor');
const { unauthorized } = require('../utils/statusCode');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw errorConstructor(unauthorized, { message: 'Token not found' });

    const user = authService.verifyToken(authorization);
    if (!user) throw errorConstructor(unauthorized, { message: 'Expired or invalid token' });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};