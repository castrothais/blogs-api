const { createCategorie } = require('../services/categorieServices');
const { created } = require('../utils/statusCode');

const categorieCreatedController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const categorieCreated = await createCategorie(name);
    return res.status(created).json(categorieCreated);
  } catch (err) {
    next(err);
  }
};

module.exports = categorieCreatedController;