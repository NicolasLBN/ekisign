'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Project, { through: 'ProjectUsers', foreignKey: 'userId' });
      User.belongsToMany(models.Bench, { through: 'UserBenches', foreignKey: 'userId' });
      User.belongsToMany(models.Equipment, { through: 'EquipmentUsers', foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
