const blogpostService = require('../services/blogpostService');

const getAll = async (_req, res, next) => {
  try {
    const allPosts = await blogpostService.getAll();
    return res.status(200).json(allPosts);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getAll };
