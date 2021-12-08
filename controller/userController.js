const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  console.log(displayName);
    
  try {
    const user = await userService.createUser(displayName, email, password, image);
    return res.status(201).json({ token: user });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const user = await userService.getAll();
    // console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userService.getById(id);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createUser, getAll, getById };
