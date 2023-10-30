module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
      },
      publish_date: {
        type: DataTypes.DATE,
      },
      expired_date: {
        type: DataTypes.DATE,
      },
      image: {
        type: DataTypes.STRING,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'article_categories',
          },
          key: 'id',
        },
      },
    },
    { tableName: 'articles' },
  );

  Article.associate = (models) => {
    Article.belongsTo(models.ArticleCategories, {
      foreignKey: 'category_id',
      as: 'category',
    });
  };

  return Article;
};
