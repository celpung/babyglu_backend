module.exports = (sequelize, DataTypes) => {
  const WeightStandard = sequelize.define(
    "WeightStandard",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autiIncrement: true,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      male_min: {
        type: DataTypes.FLOAT,
      },
      male_max: {
        type: DataTypes.FLOAT,
      },
      female_min: {
        type: DataTypes.FLOAT,
      },
      female_max: {
        type: DataTypes.FLOAT,
      },
    }, { tableName: "weight_standard", }
  );

  return WeightStandard;
};