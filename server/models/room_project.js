'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomProjects extends Model {
    static associate(models) {
    }
  }
  RoomProjects.init({
    roomId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Projects',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'RoomProjects',
    timestamps: false
  });
  return RoomProjects;
};