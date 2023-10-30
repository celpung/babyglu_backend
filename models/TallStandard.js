module.exports = (sequelize, DataTypes) => {
  const TallStandard = sequelize.define(
    "TallStandard",
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
    }, { tableName: "tall_standard", }
  );

  return TallStandard;
};