"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Code to drop the table
    await queryInterface.dropTable("AdditionalFeatures");
  },

  async down(queryInterface, Sequelize) {
    // Code to recreate the table (optional)
    await queryInterface.createTable("AdditionalFeatures", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.STRING,
      },
      style: {
        type: Sequelize.STRING,
      },
      features: {
        type: Sequelize.STRING, // You can change the type based on your needs
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
};
