module.exports = (sequelize, DataTypes) => {
  const ImageAksiPenanganan = sequelize.define(
    'ImageAksiPenanganan',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      aksi_penanganan_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'aksi_penanganan',
          },
          key: 'id',
        },
      },
      uri: {
        type: DataTypes.STRING,
      },
    },
    { tableName: 'image_aksi_penanganan' },
  );

  ImageAksiPenanganan.associate = (models) => {
    ImageAksiPenanganan.belongsTo(models.AksiPenanganan, {
      foreignKey: 'aksi_penanganan_id',
      as: 'aksi_penanganan',
    });
  };

  return ImageAksiPenanganan;
};
