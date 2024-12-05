const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('MP', 'TST'),
      allowNull: false,
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Teams',
        key: 'team_id',
      },
      allowNull: true,
    },
  }, {
    tableName: 'Users',
    timestamps: true,
  });
  
  module.exports = User;