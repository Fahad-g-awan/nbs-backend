"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StyleCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StyleCategory.init(
    {
      style: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StyleCategory",
      freezeTableName: true,
    }
  );
  return StyleCategory;
};
