const { BlogPost, Category, User } = require('../models/index');
const { blogpostEntries, updateInputs } = require('../utils/blogpostValidations');

const checkCategory = async (categoryIds) => {
  const checkDB = await Category.findOne({ where: { id: categoryIds[0] } });
  if (checkDB === null) {
    const err = { code: 400, message: '"categoryIds" not found' };
    throw err;
  }
};

// const checkUpdate = async (postId, checkId) => {
//   const originalPost = await BlogPost.findByPk(postId);
//   const { userId } = originalPost;

//   if (userId !== checkId) {
//     const err = { code: 401, message: 'Unauthorized user' };
//     throw err;
//   }
// };

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
  updateInputs(data);
  const { title, content, id } = data;

  const updated = BlogPost.update({ title, content }, { where: { id } });
  return updated;
};

module.exports = { getAll, createPost, getById, updatePost };
