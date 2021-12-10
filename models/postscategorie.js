module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define(
    'PostsCategorie', 
    {},
    { timestamps: false },
  );

  PostsCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
    { as: 'categories', through: PostsCategorie, foreignKey: 'cateogryId', otherKey: 'postId' });

    models.Category.belongsToMany(models.BlogPost, 
    { as: 'blogposts', through: PostsCategorie, foreignKey: 'selloffId', otherKey: 'productId' });
  };
  
  return PostsCategorie;
};