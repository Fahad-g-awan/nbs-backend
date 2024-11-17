"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename table from 'Materials' to 'MaterialCategories'
    await queryInterface.renameTable("Materials", "MaterialCategories");
  },

  async down(queryInterface, Sequelize) {
    // Rollback the renaming in case of an undo
    await queryInterface.renameTable("MaterialCategories", "Materials");
  },
};
