'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tall_standard', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      male_min: {
        type: Sequelize.FLOAT,
      },
      male_max: {
        type: Sequelize.FLOAT,
      },
      female_min: {
        type: Sequelize.FLOAT,
      },
      female_max: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('tall_standard');
  }
};
