const { Users } = require('../models'); // 
const { userSchema } = require('../schemas/userSchemas');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, conflict } = require('../utils/statusCode');
const { genToken } = require('./authServices');

const createUser = async (displayName, email, password, image) => {
  // VALIDAÇÕES DO SCHEMA
  const { error } = userSchema.validate({ displayName, email, password, image });
  
  if (error) {
    throw errorConstructor(badRequest, { message: error.message });
  }

  // VERIFICA SE EMAIL JÁ EXISTE
  const EmailAlreadyExists = await Users.findOne({ where: { email } });
  if (EmailAlreadyExists) throw errorConstructor(conflict, { message: 'User already registered' });

  // CRIA O USER SEM A SENHA - RETORNA O TOKEN
  const user = await Users.create({ displayName, email, password, image });
  const { password: _password, ...userWithoutPassword } = user;
  const token = genToken(userWithoutPassword);
  return token;
};

module.exports = { createUser };