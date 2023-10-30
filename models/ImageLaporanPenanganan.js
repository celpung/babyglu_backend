module.exports = (sequelize, DataTypes) => {
  const ImageLaporanPenanganan = sequelize.define(
    'ImageLaporanPenanganan',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      laporan_penanganan_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'laporan_penanganan',
          },
          key: 'id',
        },
      },
      uri: {
        type: DataTypes.STRING,
      },
    },
    { tableName: 'image_laporan_penanganan' },
  );

  ImageLaporanPenanganan.associate = (models) => {
    ImageLaporanPenanganan.belongsTo(models.LaporanPenanganan, {
      foreignKey: 'laporan_penanganan_id',
      as: 'penanganan',
    });
  };

  return ImageLaporanPenanganan;
};
