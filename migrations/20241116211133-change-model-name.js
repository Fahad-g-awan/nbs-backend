"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("products", "product");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("product", "products");
  },
};
