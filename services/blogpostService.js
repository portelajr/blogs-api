const { BlogPost } = require('../models/index');

const getAll = async () => {
  const allPosts = await BlogPost.findAll();
  console.log(allPosts);
  return allPosts;
};

module.exports = { getAll };
