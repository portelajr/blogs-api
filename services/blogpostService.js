const { BlogPost, Categorie, User } = require('../models/index');
const { blogpostEntries } = require('../utils/blogpostValidations');

const checkDB = async (categoryIds) => {
  const checkCategorie = await Categorie.findAll({ where: { id: categoryIds } });

  if (checkCategorie === null) {
    const err = { code: 400, message: '"categoryIds" not found' };
    throw err;
  }
};

// const createAssociation = async (postId, categoryId) => {
//   try {
//     const newAssociation = await PostCategorie.create({ postId, categoryId });
//     return newAssociation;
//   } catch (erro) {
//     const err = { code: 400, message: 'Association error' };
//     throw err;
//   }
// };

const getAll = async () => {
  const allPosts = await BlogPost
    .findAll({
      include: [
        { model: Categorie, as: 'categories' },
        { model: User, as: 'user', attributes: { exclude: ['password'] } }] });
  console.log(allPosts);
  return allPosts;
};

const createPost = async (title, content, categoryIds, userId) => {
  blogpostEntries(title, content, categoryIds);
  await checkDB(categoryIds);

  const published = new Date();
  const updated = new Date();
  
  const newPost = await BlogPost
    .create({ title, content, userId, published, updated });
  const categories = await Categorie.findAll({ where: { id: categoryIds } });
  await newPost.addCategories(categories);

  const { id } = newPost;
  const response = { id, userId, title, content };
  return response;
};

module.exports = { getAll, createPost };
