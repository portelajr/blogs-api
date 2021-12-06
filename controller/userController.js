const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
    
  try {
    const user = await userService.createUser(displayName, email, password, image);
    return res.status(201).json({ token: user });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = { createUser };
