const tokenGenerator = require('../utils/tokenGenerator');
const loginEntries = require('../utils/loginValidations');
const { User } = require('../models/index');

const loginUser = async (payload) => {
  try {
    await loginEntries(payload);
    const { email } = payload;
    const user = await User.findOne({ where: { email } });
    console.log(user.dataValues);
    if (user === null) {
      const err = { code: 400, message: 'Invalid fields' };
      throw err;
    }

    return tokenGenerator(user);
  } catch (error) {
    const err = { ...error };
    throw err;
  }
};

module.exports = { loginUser };
