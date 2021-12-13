const { BlogPost, Category, User } = require('../models/index');
const { blogpostEntries } = require('../utils/blogpostValidations');

const checkCat = async (categoryIds) => {
  const checkCategorie = await Category.findOne({ where: { id: categoryIds[0] } });
  if (checkCategorie === null) {
    const err = { code: 400, message: '"categoryIds" not found' };
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
  await checkCat(categoryIds);

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

module.exports = { getAll, createPost, getById };
