'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EquipmentUsers extends Model {
    static associate(models) {
      // associations can be defined here if needed
    }
  }
  EquipmentUsers.init({
    equipmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Equipments',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'EquipmentUsers',
    timestamps: false
  });
  return EquipmentUsers;
};
