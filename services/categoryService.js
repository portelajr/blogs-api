const { Category } = require('../models/index');

const createCategorie = async (name) => {
  if (!name) {
    const err = { code: 400, message: '"name" is required' };
    throw err;
  }

  const newCategorie = await Category.create({ name });
  return newCategorie;
};

const getAll = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = { createCategorie, getAll };
