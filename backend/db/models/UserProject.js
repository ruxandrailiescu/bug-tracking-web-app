const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserProject = sequelize.define('UserProject', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'user_id',
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Projects',
        key: 'project_id',
      },
    },
  }, {
    tableName: 'Users_Projects',
    timestamps: true,
  });
  
  module.exports = UserProject;
  