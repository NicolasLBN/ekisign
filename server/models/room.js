'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsToMany(models.Project, { through: 'RoomProjects' });
      Room.hasMany(models.Bench, { foreignKey: 'roomId' });
    }
  }
  Room.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
    timestamps: true,
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt'  
  });
  return Room;
};
