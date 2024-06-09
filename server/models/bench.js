'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bench extends Model {
    static associate(models) {
      Bench.belongsTo(models.Room, { foreignKey: 'roomId' });
      Bench.belongsToMany(models.User, { through: 'UserBenches', foreignKey: 'benchId' });
      Bench.belongsToMany(models.Equipment, { through: 'BenchEquipments', foreignKey: 'benchId' });
    }
  }
  Bench.init({
    name: DataTypes.STRING,
    roomId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Bench',
  });
  return Bench;
};
