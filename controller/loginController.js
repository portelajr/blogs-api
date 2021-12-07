const loginService = require('../services/loginService');

const loginUser = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const token = await loginService.loginUser(payload);
    
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = { loginUser };
