const sequelize = require('../db');

const User = require('./User');
const Team = require('./Team');
const Project = require('./Project');
const UserProject = require('./UserProject');
const Bug = require('./Bug');
const Commit = require('./Commit');
const BugHistory = require('./BugHistory');

module.exports = {
    sequelize,
    User,
    Team,
    Project,
    UserProject,
    Bug,
    Commit,
    BugHistory,
  };