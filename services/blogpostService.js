const { BlogPost, Categorie } = require('../models/index');
const { blogpostEntries } = require('../utils/blogpostValidations');

const checkDb = async (categoryIds) => {
  const checkCategorie = await Categorie.findAll({ where: { categoryIds } });

  if (checkCategorie === null) {
    const err = { code: 400, message: '"categoryIds" not found' };
    throw err;
  }
};

const getAll = async () => {
  const allPosts = await BlogPost
    .findAll({ include: { model: Categorie, as: 'categories' } });
  console.log(allPosts);
  return allPosts;
};

const createPost = async (title, content, categoryIds, userId) => {
  blogpostEntries(title, content, categoryIds);
  await checkDb(categoryIds);
  const newPost = await BlogPost.create({ title, content, userId });
  return newPost;
  
  //   const { id: postId } = create;
  //   const createAssociation = 
};

module.exports = { getAll, createPost };
