const blogpostService = require('../services/blogpostService');

const getAll = async (_req, res, next) => {
  try {
    const allPosts = await blogpostService.getAll();
    return res.status(200).json(allPosts);
  } catch (err) {
    return next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await blogpostService.getById(id);
    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

const createPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  console.log(categoryIds);
  const { id: userId } = req.user;
  
  try {
    const newPost = await blogpostService
    .createPost(title, content, categoryIds, userId);
    return res.status(201).json(newPost);
  } catch (err) {
    return next(err);
  }
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  console.log(user);
  const data = { ...req.body, id };

  try {
    const post = blogpostService.updatePost(data);
    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getAll, createPost, getById, updatePost };
