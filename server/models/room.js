'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsToMany(models.Project, {
        through: models.RoomProjects, // Table de jonction
        foreignKey: 'roomId', // Clé étrangère sur RoomProjects
        otherKey: 'projectId' // Autre clé étrangère
      });

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
