'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('aksi_penanganan', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      checkup_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'checkups',
          },
          key: 'id',
        },
      },
      pasokan: {
        type: Sequelize.STRING,
      },
      pasokan_lainnya: {
        type: Sequelize.STRING,
      },
      sosialisasi: {
        type: Sequelize.STRING,
      },
      sosialisasi_lainnya: {
        type: Sequelize.STRING,
      },
      sanitasi: {
        type: Sequelize.STRING,
      },
      penanganan_lainnya: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('aksi_penanganan');
  },
};
