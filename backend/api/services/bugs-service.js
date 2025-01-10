const { Bug } = require('../../db/models');

async function getAllBugs() {
  const queryResult = await Bug.findAll();
  return queryResult.map((bug) => bug.dataValues);
}

async function getBugById(id) {
  const bug = await Bug.findByPk(id);
  return bug ? bug.dataValues : null;
}

async function createBug(bugData) {
  const newBug = await Bug.create(bugData);
  return newBug.dataValues;
}

async function updateBug(id, updatedData) {
  const bug = await Bug.findByPk(id);
  if (!bug) return null;
  await bug.update(updatedData);
  return bug.dataValues;
}

async function deleteBug(id) {
  const rowsDeleted = await Bug.destroy({ where: { id } });
  return rowsDeleted;
}

module.exports = {
  getAllBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
};