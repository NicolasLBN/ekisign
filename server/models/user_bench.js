'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserBenches extends Model {
  }
  UserBenches.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    benchId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Benches',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserBenches',
    timestamps: false
  });
  return UserBenches;
};
