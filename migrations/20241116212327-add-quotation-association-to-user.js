"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user", "quotation_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "quotation",
        key: "id",
      },
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // If the migration is rolled back, remove the foreign key
    await queryInterface.removeColumn("user", "quotation_id");
  },
};
