const UserProject = require('../../db/models/UserProject');

// Service to create a new user-project association
async function createUserProject(data) {
  try {
    const userProject = await UserProject.create(data);
    return userProject;
  } catch (error) {
    throw error;
  }
}

// Service to get all user-project associations
async function getAllUserProjects() {
  try {
    const userProjects = await UserProject.findAll();
    return userProjects;
  } catch (error) {
    throw error;
  }
}

// Service to get user-project association by user id
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

// Service to get user-project association by project id
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

// Service to update user-project role
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

// Service to delete user-project association
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
