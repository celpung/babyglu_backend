module.exports = (sequelize, DataTypes) => {
  const Vaccine = sequelize.define(
    "Vaccine",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "vaccines" }
  );

  Vaccine.associate = (models) => {
    Vaccine.hasMany(models.Vaccination, {
      foreignKey: "vaccine_id",
      as: "vaccination",
    });
  };

  return Vaccine;
};
