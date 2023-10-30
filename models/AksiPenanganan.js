module.exports = (sequelize, DataTypes) => {
  const AksiPenanganan = sequelize.define(
    'AksiPenanganan',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      checkup_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'checkups',
          },
          key: 'id',
        },
      },
      pasokan: {
        type: DataTypes.STRING,
      },
      pasokan_lainnya: {
        type: DataTypes.STRING,
      },
      sosialisasi: {
        type: DataTypes.STRING,
      },
      sosialisasi_lainnya: {
        type: DataTypes.STRING,
      },
      sanitasi: {
        type: DataTypes.STRING,
      },
      penanganan_lainnya: {
        type: DataTypes.STRING,
      },
    },
    { tableName: 'aksi_penanganan' },
  );

  AksiPenanganan.associate = (models) => {
    AksiPenanganan.belongsTo(models.Checkup, {
      foreignKey: 'checkup_id',
      as: 'checkup',
    });
    AksiPenanganan.hasMany(models.ImageAksiPenanganan, {
      foreignKey: 'aksi_penanganan_id',
      as: 'image_aksi_penanganan',
    });
  };

  return AksiPenanganan;
};
