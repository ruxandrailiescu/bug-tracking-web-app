const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Project = sequelize.define('Project', {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Teams',
        key: 'team_id',
      },
      allowNull: false,
    },
    repository_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'Projects',
    timestamps: true,
  });
  
  module.exports = Project;
  