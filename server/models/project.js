// models/project.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.Room, { through: 'RoomProjects' });
    }
  }
  Project.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
