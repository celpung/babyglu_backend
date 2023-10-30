module.exports = (sequelize, DataTypes) => {
  const ArticleCategories = sequelize.define(
    "ArticleCategories",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    }, { tableName: "article_categories", }
  );

  ArticleCategories.associate = (models) => {
    ArticleCategories.hasMany(models.Article, {
      foreignKey: "category_id",
      as: "article",
    });
  }

  return ArticleCategories;
};