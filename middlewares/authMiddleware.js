require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const authUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data;
    // console.log(data);
    return next();
  } catch (error) {
    const err = { code: 401, message: 'Expired or invalid token' };
    return next(err);
  }
};

module.exports = authUser;
