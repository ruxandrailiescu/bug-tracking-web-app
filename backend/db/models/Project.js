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
    repository_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'Projects',
    timestamps: true,  // Ensure timestamps are automatically handled
    createdAt: 'created_at',  // Optional, maps Sequelize's createdAt to created_at
    updatedAt: 'updated_at',  // Optional, maps Sequelize's updatedAt to updated_at
  });
  
  module.exports = Project;
