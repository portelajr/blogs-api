const tokenGenerator = require('../utils/tokenGenerator');
const loginEntries = require('../utils/loginValidations');
const { User } = require('../models/index');

const loginUser = async (payload) => {
  loginEntries(payload);
  const { email } = payload;
  const user = await User.findOne({ where: { email } });
    
  if (user === null) {
    const err = { code: 400, message: 'Invalid fields' };
    throw err;
  }

  return tokenGenerator(user);
};

module.exports = { loginUser };
