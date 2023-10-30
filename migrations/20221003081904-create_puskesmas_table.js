"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('puskesmas', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("puskesmas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      // pic: {
      //   type: Sequelize.STRING,
      // },
      phone: {
        type: Sequelize.STRING,
      },
      tot_posyandu: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      province: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      village: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },

      postal_code: {
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("puskesmas");
  },
};
