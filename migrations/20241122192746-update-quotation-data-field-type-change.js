"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add a temporary column with JSON type
    await queryInterface.addColumn("Quotations", "data_temp", {
      type: Sequelize.JSON,
      allowNull: true, // Adjust based on your requirements
    });

    // Copy data from the old column to the new column with casting
    await queryInterface.sequelize.query(
      `UPDATE "Quotations" SET "data_temp" = "data"::json`
    );

    // Remove the old column
    await queryInterface.removeColumn("Quotations", "data");

    // Rename the temporary column to the original column name
    await queryInterface.renameColumn("Quotations", "data_temp", "data");
  },

  async down(queryInterface, Sequelize) {
    // Revert the process: Add a temporary column with TEXT type
    await queryInterface.addColumn("Quotations", "data_temp", {
      type: Sequelize.TEXT,
      allowNull: true, // Adjust based on your requirements
    });

    // Copy data from the JSON column back to the TEXT column
    await queryInterface.sequelize.query(
      `UPDATE "Quotations" SET "data_temp" = "data"::text`
    );

    // Remove the JSON column
    await queryInterface.removeColumn("Quotations", "data");

    // Rename the temporary column back to the original column name
    await queryInterface.renameColumn("Quotations", "data_temp", "data");
  },
};
