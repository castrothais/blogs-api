const { createCategorie, categoriesAllList } = require('../services/categorieServices');
const { created, sucess } = require('../utils/statusCode');

const categorieCreatedController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const categorieCreated = await createCategorie(name);
    return res.status(created).json(categorieCreated);
  } catch (err) {
    next(err);
  }
};

const allCategoriesController = async (_req, res, next) => {
  try {
    const allCategories = await categoriesAllList();
    return res.status(sucess).json(allCategories);
  } catch (err) {
    next(err);
  }
};

module.exports = { categorieCreatedController, allCategoriesController };