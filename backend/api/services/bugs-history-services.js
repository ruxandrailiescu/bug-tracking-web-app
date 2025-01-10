const { BugHistory } = require('../../db/models');

async function getAllBugHistories() {
  const queryResult = await BugHistory.findAll();
  return queryResult.map((history) => history.dataValues);
}

async function getBugHistoryById(id) {
  const history = await BugHistory.findByPk(id);
  return history ? history.dataValues : null;
}

async function createBugHistory(bugHistoryData) {
  const newHistory = await BugHistory.create(bugHistoryData);
  return newHistory.dataValues;
}

async function updateBugHistory(id, bugHistoryData) {
  const history = await BugHistory.findByPk(id);
  if (!history) return null;
  await history.update(bugHistoryData);
  return history.dataValues;
}

async function deleteBugHistory(id) {
  const rowsDeleted = await BugHistory.destroy({ where: { history_id: id } });
  return rowsDeleted;
}

module.exports = {
  getAllBugHistories,
  getBugHistoryById,
  createBugHistory,
  updateBugHistory,
  deleteBugHistory,
};
