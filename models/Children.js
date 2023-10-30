module.exports = (sequelize, DataTypes) => {
  const Children = sequelize.define(
    'Children',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      anak_ke: {
        type: DataTypes.INTEGER,
      },
      sex: {
        type: DataTypes.STRING,
      },
      born_place: {
        type: DataTypes.STRING,
      },
      birth_date: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'normal',
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
    },
    { tableName: 'childrens' },
  );

  Children.associate = (models) => {
    Children.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    Children.hasMany(models.Checkup, {
      foreignKey: 'children_id',
      as: 'checkup',
    });
  };

  return Children;
};
