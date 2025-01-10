const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const BugHistory = sequelize.define('BugHistory', {
    history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    old_value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    new_value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bug_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bugs',
        key: 'bug_id',
      },
      allowNull: false,
    },
  }, {
    tableName: 'Bugs_History',
    timestamps: false,
  });
  
  module.exports = BugHistory;
  