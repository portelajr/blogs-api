const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    diplayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  return user;
};

module.exports = User;
