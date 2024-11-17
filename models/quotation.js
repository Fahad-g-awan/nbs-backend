"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {
    static associate(models) {
      Quotation.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Quotation.init(
    {
      user_id: DataTypes.INTEGER,
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_phone: DataTypes.STRING,
      data: DataTypes.TEXT,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quotation",
    }
  );
  return Quotation;
};
