const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  image: Joi.string().required(),
});

const validateName = (displayName) => {
  if (typeof displayName === 'string' && displayName.length < 8) {
    const err = { code: 400, message: '"displayName" length must be at least 8 characters long' };
    throw err;
  }
};

const validateEmail = (email) => {
  if (typeof displayName === 'string' && displayName.length < 8) {
    const err = { code: 400, message: '"displayName" length must be at least 8 characters long' };
    throw err;
  }
};
