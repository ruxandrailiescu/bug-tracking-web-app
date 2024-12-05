const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Commit = sequelize.define('Commit', {
    commit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'user_id',
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Commits',
    timestamps: true,
  });
  
  module.exports = Commit;
  