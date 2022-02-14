const blogPosts = (sequelize, DataTypes) => {
  const blogs = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  },
  { createdAt: 'published',
  updatedAt: 'updated' });

  blogs.associate = (models) => {
    models.BlogPosts.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return blogs;
};

module.exports = blogPosts;
