const { Categories } = require('../models');
const { categorieSchema } = require('../schemas/categorieSchemas');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest } = require('../utils/statusCode');

const createCategorie = async (name) => {
  // VALIDAÇÕES DO SCHEMA CATEGORIES
  const { error } = categorieSchema.validate({ name });

  if (error) {
    throw errorConstructor(badRequest, { message: error.message });
  }

  const categorie = await Categories.create({ name });
  return categorie;
};

const categoriesAllList = async () => {
  const listCategories = await Categories.findAll();
  return listCategories;
};

module.exports = { createCategorie, categoriesAllList };