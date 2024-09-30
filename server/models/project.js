'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.Room, {
        through: models.RoomProjects, // Table de jonction
        foreignKey: 'projectId', // Clé étrangère sur RoomProjects
        otherKey: 'roomId' // Autre clé étrangère
      });
      Project.belongsToMany(models.User, { through: 'ProjectUsers' });
    }
  }
  Project.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
    timestamps: true,
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt'  
  });
  return Project;
};
