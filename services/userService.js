const { User } = require('../models/index');
const tokenGenerator = require('../utils/tokenGenerator');
const { userEntries } = require('../utils/userValidations');

const checkDB = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    const err = { code: 409, message: 'User already registered' };
    throw err;
  }
};

const createUser = async (displayName, email, password, image) => {
  console.log(displayName);
  try {
    await userEntries(displayName, email, password);
    await checkDB(email);
    const user = await User.create({ displayName, email, password, image });
    const token = tokenGenerator(user);
    return token;
  } catch (error) {
    const err = { ...error };
    throw err;
  }
};

module.exports = { createUser };
