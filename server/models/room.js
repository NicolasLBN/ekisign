// models/room.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsToMany(models.Project, { through: 'RoomProjects' });
      Room.hasMany(models.Bench);
    }
  }
  Room.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
