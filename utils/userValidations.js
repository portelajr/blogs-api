const validateName = (displayName) => {
  if (typeof displayName === 'string' && displayName.length < 8) {
    const err = { code: 400, message: '"displayName" length must be at least 8 characters long' };
    throw err;
  }
};

const validateEmail = (email) => {
  if (!email) {
    const err = { code: 400, message: '"email" is required' };
    throw err;
  }
  
  const patternEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!patternEmail) {
    const err = { code: 400, message: '"email" must be a valid email' };
    throw err;
  }
};

const validatePassword = (password) => {
  if (!password) {
    const err = { code: 400, message: '"password" is required' };
    throw err;
  }

  if (typeof password === 'string' && password.length !== 6) {
    const err = { code: 400, message: '"password" length must be 6 characters long' };
    throw err;
  }
};

const userEntries = (displayName, email, password) => {
  validateName(displayName);
  validatePassword(password);
  validateEmail(email);
};

module.exports = { userEntries };
