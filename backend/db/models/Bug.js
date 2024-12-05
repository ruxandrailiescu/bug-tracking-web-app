const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bug = sequelize.define('Bug', {
    bug_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Open', 'In Progress', 'Resolved'),
      defaultValue: 'Open',
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM('Minor', 'Major', 'Critical'),
      allowNull: false,
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'user_id',
      },
      allowNull: true,
    },
    commit_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Commits',
        key: 'commit_id',
      },
      allowNull: true,
    },
  }, {
    tableName: 'Bugs',
    timestamps: false,
  });
  
  module.exports = Bug;
  