module.exports = (sequelize, DataTypes) => {
  const Vaccination = sequelize.define(
    'Vaccination',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      children_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'childrens',
          },
          key: 'id',
        },
      },
      vaccine_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'vaccines',
          },
          key: 'id',
        },
      },
      dose: {
        type: DataTypes.FLOAT,
      },
    },
    { tableName: 'vaccinations' },
  );

  Vaccination.associate = (models) => {
    Vaccination.belongsTo(models.Vaccine, {
      foreignKey: 'vaccine_id',
      as: 'vaccine',
    });
  };

  return Vaccination;
};
