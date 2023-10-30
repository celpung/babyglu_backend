'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('laporan_posyandu', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_activity: {
        type: Sequelize.STRING,
      },
      posyandu_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'posyandus',
          },
          key: 'id',
        },
      },
      start_time: {
        type: Sequelize.STRING,
      },
      finish_time: {
        type: Sequelize.STRING,
      },
      participant: {
        type: Sequelize.TEXT,
      },
      ket: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('laporan_posyandu');
  },
};
