'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('checkups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tall: {
        type: Sequelize.FLOAT,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      headcircumference: {
        type: Sequelize.FLOAT,
      },
      armcircumference : {
        type: Sequelize.FLOAT,
        allowNull: true
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
      vaccination_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "vaccinations",
          },
          key: 'id'
        },
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "normal"
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('checkups');
  }
};
