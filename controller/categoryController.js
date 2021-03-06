const categoryService = require('../services/categoryService');

const createCategorie = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newCategorie = await categoryService.createCategorie(name);
    return res.status(201).json(newCategorie);
  } catch (err) {
    return next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const allCategories = await categoryService.getAll();
    return res.status(200).json(allCategories);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createCategorie, getAll };
