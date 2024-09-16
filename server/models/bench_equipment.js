'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BenchEquipments extends Model {
  }
  BenchEquipments.init({
    benchId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Benches',
        key: 'id'
      }
    },
    equipmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Equipment',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'BenchEquipments',
    timestamps: false
  });
  return BenchEquipments;
};