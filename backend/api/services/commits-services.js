const { Commit } = require('../../db/models');

async function getAllCommits() {
  const queryResult = await Commit.findAll();
  return queryResult.map((commit) => commit.dataValues);
}

async function getCommitById(commitId) {
  const commit = await Commit.findByPk(commitId);
  return commit ? commit.dataValues : null;
}

async function createCommit(commitData) {
  const newCommit = await Commit.create(commitData);
  return newCommit.dataValues;
}

async function deleteCommit(commitId) {
  const rowsDeleted = await Commit.destroy({ where: { commit_id: commitId } });
  return rowsDeleted;
}

module.exports = {
  getAllCommits,
  getCommitById,
  createCommit,
  deleteCommit,
};
