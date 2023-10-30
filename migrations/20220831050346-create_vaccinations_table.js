'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vaccinations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      children_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "childrens",
          },
          key: 'id'
        },
      },
      vaccine_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "vaccines",
          },
          key: 'id'
        },
      },
      dose: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vaccinations');
  }
};
