"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("AdditionalFeatures", "style_temp", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("AdditionalFeatures", "color_temp", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.sequelize.query(`
      UPDATE "AdditionalFeatures"
      SET "style_temp" = ARRAY["style"]
    `);
    await queryInterface.sequelize.query(`
      UPDATE "AdditionalFeatures"
      SET "color_temp" = ARRAY["color"]
    `);
    await queryInterface.removeColumn("AdditionalFeatures", "style");
    await queryInterface.removeColumn("AdditionalFeatures", "color");
    await queryInterface.renameColumn(
      "AdditionalFeatures",
      "style_temp",
      "style"
    );
    await queryInterface.renameColumn(
      "AdditionalFeatures",
      "color_temp",
      "color"
    );
  },

  async down(queryInterface, Sequelize) {
    // Reverse the process in case of rollback

    // Add temporary columns
    await queryInterface.addColumn("AdditionalFeatures", "style_temp", {
      type: sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });

    await queryInterface.addColumn("AdditionalFeatures", "color_temp", {
      type: sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });

    // Copy data from the old columns to the temporary ones (assuming the conversion logic)
    await queryInterface.sequelize.query(`
      UPDATE "AdditionalFeatures"
      SET "style_temp" = "style"::TEXT
    `);

    await queryInterface.sequelize.query(`
      UPDATE "AdditionalFeatures"
      SET "color_temp" = "color"::TEXT
    `);

    // Drop the old columns
    await queryInterface.removeColumn("AdditionalFeatures", "style");
    await queryInterface.removeColumn("AdditionalFeatures", "color");

    // Rename the temporary columns to the original column names
    await queryInterface.renameColumn(
      "AdditionalFeatures",
      "style_temp",
      "style"
    );
    await queryInterface.renameColumn(
      "AdditionalFeatures",
      "color_temp",
      "color"
    );
  },
};
