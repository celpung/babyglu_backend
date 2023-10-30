module.exports = (sequelize, DataTypes) => {
  const Puskesmas = sequelize.define(
    "Puskesmas",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      // pic: {
      //   type: DataTypes.STRING,
      // },
      phone: {
        type: DataTypes.STRING,
      },
      tot_posyandu: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      province: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      village: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },

      postal_code: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "puskesmas" }
  );

  //hasmany children vaccinations
  Puskesmas.associate = (models) => {
    Puskesmas.hasMany(models.Nakes, {
      foreignKey: "puskesmas_id",
      as: "nakes",
    });
  };

  return Puskesmas;
};
