const { Project } = require('../../db/models');

async function getAllProjects() {
  const queryResult = await Project.findAll();
  return queryResult.map((project) => project.dataValues);
}

async function getProjectById(id) {
  const project = await Project.findByPk(id);
  return project ? project.dataValues : null;
}

async function createProject(projectData) {
  const newProject = await Project.create(projectData);
  return newProject.dataValues;
}

async function updateProject(id, projectData) {
  const project = await Project.findByPk(id);
  if (!project) return null;
  await project.update(projectData);
  return project.dataValues;
}

async function deleteProject(id) {
  const rowsDeleted = await Project.destroy({ where: { id } });
  return rowsDeleted;
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
