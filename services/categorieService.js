const { Categorie } = require('../models/index');

const createCategorie = async (name) => {
  // validações de entrada aqui

  const newCategorie = await Categorie.create({ name });
  return newCategorie;
};

module.exports = { createCategorie };
