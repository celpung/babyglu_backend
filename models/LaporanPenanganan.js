module.exports = (sequelize, DataTypes) => {
  const LaporanPenanganan = sequelize.define(
    'LaporanPenanganan',
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
      total_anak: {
        type: DataTypes.STRING,
      },
      penanganan: {
        type: DataTypes.TEXT,
      },
      ket: {
        type: DataTypes.TEXT,
      },
    },
    { tableName: 'laporan_penanganan' },
  );

  LaporanPenanganan.associate = (models) => {
    LaporanPenanganan.belongsTo(models.Posyandu, {
      foreignKey: 'posyandu_id',
      as: 'posyandu',
    });

    LaporanPenanganan.hasMany(models.ImageLaporanPenanganan, {
      foreignKey: 'laporan_penanganan_id',
      as: 'image_penanganan',
    });
  };

  return LaporanPenanganan;
};
