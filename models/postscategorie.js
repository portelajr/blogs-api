module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define(
    'PostsCategorie', 
    {},
    { timestamps: false },
  );

  PostsCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
    { as: 'categories', through: PostsCategorie, foreignKey: 'categoryId', otherKey: 'postId' });

    models.Category.belongsToMany(models.BlogPost, 
    { as: 'blogposts', through: PostsCategorie, foreignKey: 'postId', otherKey: 'categoryId' });
  };
  
  return PostsCategorie;
};