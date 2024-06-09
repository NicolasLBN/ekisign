'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectUsers extends Model {
    static associate(models) {
      // associations can be defined here if needed
    }
  }
  ProjectUsers.init({
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Projects',
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
    modelName: 'ProjectUsers',
    timestamps: false
  });
  return ProjectUsers;
};
