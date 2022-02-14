const Users = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false });

  /* user.associate = (models) => {
    models.Users.hasMany(models.BlogPosts, {
      as: 'blogPosts',
      foreignKey: 'blogPostId',
    });
  }; */

  return user;
};

module.exports = Users;
