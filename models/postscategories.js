const PostsCategory = (sequelize) => {
  const postCategory = sequelize.define('PostsCategory', {}, {
    timestamps: false, tableName: 'PostsCategories' });

    postCategory.associate = (models) => {
      models.Categories.belongsToMany(models.BlogPosts, {
        as: 'blogPosts',
        through: postCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
      models.BlogPosts.belongsToMany(models.Categories, {
        as: 'categories',
        through: postCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
    };
    return postCategory;
};

module.exports = PostsCategory;
