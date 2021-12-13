const { BlogPost, Category, User } = require('../models/index');
const { blogpostEntries, updateInputs } = require('../utils/blogpostValidations');

const checkCategory = async (categoryIds) => {
  const checkDB = await Category.findOne({ where: { id: categoryIds[0] } });
  if (checkDB === null) {
    const err = { code: 400, message: '"categoryIds" not found' };
    throw err;
  }
};

const checkUpdate = async (postId, userCheck) => {
  const originalPost = await BlogPost.findByPk(postId);

  if (originalPost === null) {
    const err = { code: 404, message: 'Post does not exist' };
    throw err;
  }

  const { userId } = originalPost;
  // console.log(userId, userCheck);
  if (userId !== userCheck) {
    const err = { code: 401, message: 'Unauthorized user' };
    throw err;
  }
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, 
    {
      include: [
        { model: Category, as: 'categories' },
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
      ], 
    });
  
  if (post === null) {
    const err = { code: 404, message: 'Post does not exist' };
    throw err;
  }

  return post;
};

const getAll = async () => {
  const allPosts = await BlogPost
    .findAll({
      include: [
        { model: Category, as: 'categories' },
        { model: User, as: 'user', attributes: { exclude: ['password'] } }] });
  console.log(allPosts);
  return allPosts;
};

const createPost = async (title, content, categoryIds, userId) => {
  blogpostEntries(title, content, categoryIds);
  await checkCategory(categoryIds);

  const published = new Date();
  const updated = new Date();
  
  const newPost = await BlogPost
    .create({ title, content, userId, published, updated });
  const categories = await Category.findOne({ where: { id: categoryIds[0] } });
  await newPost.addCategories(categories);

  const { id } = newPost;
  const response = { id, userId, title, content };
  return response;
};

const updatePost = async (data) => {
  const { title, content, id, userCheck } = data;
  console.log(data);
  updateInputs(data);
  await checkUpdate(id, userCheck);

  await BlogPost.update({ title, content }, { where: { id } });
  const updated = await BlogPost.findByPk(id, { include: { model: Category, as: 'categories' } });
  
  return updated;
};

const deletePost = async (data) => {
  const { id, userCheck } = data;
  console.log(userCheck);
  await checkUpdate(id, userCheck);

  await BlogPost.destroy({ where: { id } });
};

module.exports = { getAll, createPost, getById, updatePost, deletePost };
