// models/equipment.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate(models) {
      Equipment.belongsToMany(models.Bench, { through: 'BenchEquipments' });
    }
  }
  Equipment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Equipment',
  });
  return Equipment;
};
