const UserProject = require('../../db/models/UserProject');

async function createUserProject(data) {
  try {
    const userProject = await UserProject.create(data);
    return userProject;
  } catch (error) {
    throw error;
  }
}

async function getAllUserProjects() {
  try {
    const userProjects = await UserProject.findAll();
    return userProjects;
  } catch (error) {
    throw error;
  }
}

async function getUserProjectsByUserId(userId) {
  try {
    const userProjects = await UserProject.findAll({
      where: { user_id: userId },
    });
    return userProjects;
  } catch (error) {
    throw error;
  }
}

async function getUserProjectsByProjectId(projectId) {
  try {
    const userProjects = await UserProject.findAll({
      where: { project_id: projectId },
    });
    return userProjects;
  } catch (error) {
    throw error;
  }
}

async function updateUserProjectRole(userId, projectId, role) {
  try {
    const userProject = await UserProject.update(
      { role },
      {
        where: {
          user_id: userId,
          project_id: projectId,
        },
      }
    );
    return userProject;
  } catch (error) {
    throw error;
  }
}

async function deleteUserProject(userId, projectId) {
  try {
    const result = await UserProject.destroy({
      where: {
        user_id: userId,
        project_id: projectId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUserProject,
  getAllUserProjects,
  getUserProjectsByUserId,
  getUserProjectsByProjectId,
  updateUserProjectRole,
  deleteUserProject,
};
