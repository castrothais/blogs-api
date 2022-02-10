const { Users } = require('../models'); // 
const { userSchema, loginSchema } = require('../schemas/userSchemas');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, conflict, notFound } = require('../utils/statusCode');
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

const userLogin = async (email, password) => {
   // VALIDAÇÕES DO SCHEMA
  const { error } = loginSchema.validate({ email, password });

  if (error) {
    throw errorConstructor(badRequest, { message: error.message });
  }

  // VERIFICA SE O USER EXISTE NO BANCO DE DADOS
  const findUser = await Users.findOne({ where: { email, password } });
  if (!findUser) throw errorConstructor(badRequest, { message: 'Invalid fields' });

  const { password: _password, ...userWithoutPassword } = findUser.dataValues;
  const token = genToken(userWithoutPassword);
  return token;
};

const usersAllList = async () => {
  const usersList = await Users.findAll();
  return usersList;
};

const userGetById = async (id) => {
  const userFindId = await Users.findOne({ where: { id } });
  
  if (!userFindId) {
    throw errorConstructor(notFound, { message: 'User does not exist' });
  }
  return userFindId;
};

module.exports = { createUser, userLogin, usersAllList, userGetById };