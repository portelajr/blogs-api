const { Categorie } = require('../models/index');

const createCategorie = async (name) => {
  if (!name) {
    const err = { code: 400, message: '"name" is required' };
    throw err;
  }

  const newCategorie = await Categorie.create({ name });
  return newCategorie;
};

module.exports = { createCategorie };
