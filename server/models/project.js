'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.Room, { through: 'RoomProjects' });
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
