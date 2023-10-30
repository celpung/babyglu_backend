module.exports = (sequelize, DataTypes) => {
  const Kader = sequelize.define(
    'Kader',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      peran: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
        },
      },
      posyandu_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'posyandus',
          },
        },
      },
    },
    { tableName: 'kaders' },
  );

  Kader.associate = (models) => {
    Kader.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Kader.belongsTo(models.Posyandu, {
      foreignKey: 'posyandu_id',
      as: 'posyandu',
    });
  };

  return Kader;
};
