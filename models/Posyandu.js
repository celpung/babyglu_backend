module.exports = (sequelize, DataTypes) => {
  const Posyandu = sequelize.define(
    "Posyandu",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autiIncrement: true,
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
      status: {
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
        type: DataTypes.STRING,
      },
    },
    { tableName: "posyandus" }
  );

  //hasmany children vaccinations
  Posyandu.associate = (models) => {
    Posyandu.hasMany(models.Kader, {
      foreignKey: "posyandu_id",
      as: "kader",
    });

    Posyandu.hasMany(models.PosyanduReport, {
      foreignKey: "posyandu_id",
      as: "report",
    });

    Posyandu.hasMany(models.LaporanPosyandu, {
      foreignKey: "posyandu_id",
      as: "laporan",
    });

    Posyandu.hasMany(models.LaporanPenanganan, {
      foreignKey: "posyandu_id",
      as: "penanganan",
    });

    Posyandu.hasMany(models.Schedule, {
      foreignKey: "posyandu_id",
      as: "schedule",
    });
  };

  return Posyandu;
};
