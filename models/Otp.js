module.exports = (sequelize, DataTypes) => {
  const Otp = sequelize.define(
    "Otp",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
      }
    }, { tableName: "otp", }
  );

  return Otp;
};
