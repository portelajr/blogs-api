const categorieService = require('../services/categorieService');

const createCategorie = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newCategorie = await categorieService.createCategorie(name);
    return res.status(200).json(newCategorie);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createCategorie };
