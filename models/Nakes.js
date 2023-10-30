module.exports = (sequelize, DataTypes) => {
  const Nakes = sequelize.define(
    "Nakes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
        },
      },
      // nip: {
      //   type: DataTypes.STRING,
      // },
      puskesmas_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "puskesmas",
          },
        },
      },
    },
    { tableName: "nakes" }
  );

  Nakes.associate = (models) => {
    Nakes.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Nakes.belongsTo(models.Puskesmas, {
      foreignKey: "puskesmas_id",
      as: "puskesmas",
    });
  };

  return Nakes;
};
