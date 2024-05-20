// models/bench.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bench extends Model {
    static associate(models) {
      Bench.belongsTo(models.Room);
      Bench.belongsToMany(models.User, { through: 'UserBenches' });
      Bench.hasMany(models.Equipment);
    }
  }
  Bench.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bench',
  });
  return Bench;
};
