module.exports = (sequelize, DataTypes) => {
  const LaporanPosyandu = sequelize.define(
    'LaporanPosyandu',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_activity: {
        type: DataTypes.STRING,
      },
      posyandu_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'posyandus',
          },
          key: 'id',
        },
      },
      start_time: {
        type: DataTypes.STRING,
      },
      finish_time: {
        type: DataTypes.STRING,
      },
      participant: {
        type: DataTypes.TEXT,
      },
      ket: {
        type: DataTypes.TEXT,
      },
    },
    { tableName: 'laporan_posyandu' },
  );

  LaporanPosyandu.associate = (models) => {
    LaporanPosyandu.belongsTo(models.Posyandu, {
      foreignKey: 'posyandu_id',
      as: 'posyandu',
    });
    LaporanPosyandu.hasMany(models.ImageLaporanPosyandu, {
      foreignKey: 'laporan_posyandu_id',
      as: 'image_posyandu',
    });
  };

  return LaporanPosyandu;
};
