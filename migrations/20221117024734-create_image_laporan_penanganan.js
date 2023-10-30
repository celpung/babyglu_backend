'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('image_laporan_penanganan', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      laporan_penanganan_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'laporan_penanganan',
          },
          key: 'id',
        },
      },
      uri: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('image_laporan_penanganan');
  },
};
