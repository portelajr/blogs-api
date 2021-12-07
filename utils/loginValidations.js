const validateEmail = (payload) => {
  if (payload.email === '') {
    const err = { code: 400, message: '"email" is not allowed to be empty' };
    throw err;
  }
  
  if (!payload.email) {
    const err = { code: 400, message: '"email" is required' };
    throw err;
  }
};

const validatePassword = (payload) => {
  if (payload.password === '') {
    const err = { code: 400, message: '"password" is not allowed to be empty' };
    throw err;
  }

  if (!payload.password) {
    const err = { code: 400, message: '"password" is required' };
    throw err;
  }
};

const loginEntries = (payload) => {
  validateEmail(payload);
  validatePassword(payload);
};

module.exports = loginEntries;
