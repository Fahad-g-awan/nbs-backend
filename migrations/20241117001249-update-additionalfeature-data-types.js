"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("AdditionalFeatures", "features_temp", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.sequelize.query(`
      UPDATE "AdditionalFeatures"
      SET "features_temp" = ARRAY["features"]
    `);

    await queryInterface.removeColumn("AdditionalFeatures", "features");
    await queryInterface.renameColumn(
      "AdditionalFeatures",
      "features_temp",
      "features"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("AdditionalFeatures", "features_temp", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });
    await queryInterface.sequelize.query(`
      UPDATE "AdditionalFeatures"
      SET "features_temp" = ARRAY["features"]
    `);
    await queryInterface.removeColumn("AdditionalFeatures", "features");
    await queryInterface.renameColumn(
      "AdditionalFeatures",
      "features_temp",
      "features"
    );
  },
};
