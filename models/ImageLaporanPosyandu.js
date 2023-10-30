module.exports = (sequelize, DataTypes) => {
  const ImageLaporanPosyandu = sequelize.define(
    'ImageLaporanPosyandu',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      laporan_posyandu_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'laporan_posyandu',
          },
          key: 'id',
        },
      },
      uri: {
        type: DataTypes.STRING,
      },
    },
    { tableName: 'image_laporan_posyandu' },
  );

  ImageLaporanPosyandu.associate = (models) => {
    ImageLaporanPosyandu.belongsTo(models.LaporanPosyandu, {
      foreignKey: 'laporan_posyandu_id',
      as: 'laporan',
    });
  };

  return ImageLaporanPosyandu;
};
