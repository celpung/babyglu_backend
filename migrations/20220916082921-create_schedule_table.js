'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      posyandu_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "posyandus",
          },
          key: 'id'
        },
      },
      kader_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "kaders",
          },
          key: 'id'
        },
      },
      schedule: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('schedules');
  }
};
