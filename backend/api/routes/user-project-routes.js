const { createUserProject, getAllUserProjects, getUserProjectsByUserId, getUserProjectsByProjectId, updateUserProjectRole, deleteUserProject } = require('../services/user-project-service');

module.exports = function () {
  const operations = {
    GET_All_UserProjects,
    POST,
    GET_UserProjects_By_UserId,
    GET_UserProjects_By_ProjectId,
    PUT,
    DELETE,
  };

  async function GET_All_UserProjects(req, res, next) {
    try {
      const userProjects = await getAllUserProjects();
      res.status(200).json(userProjects);
    } catch (error) {
      next(error);
    }
  }

  async function POST(req, res, next) {
    try {
      const userProject = await createUserProject(req.body);
      res.status(201).json(userProject);
    } catch (error) {
      next(error);
    }
  }

  async function GET_UserProjects_By_UserId(req, res, next) {
    try {
      const { userId } = req.params;
      const userProjects = await getUserProjectsByUserId(userId);
      if (!userProjects) return res.status(404).send('User projects not found');
      res.status(200).json(userProjects);
    } catch (error) {
      next(error);
    }
  }

  async function GET_UserProjects_By_ProjectId(req, res, next) {
    try {
      const { projectId } = req.params;
      const userProjects = await getUserProjectsByProjectId(projectId);
      if (!userProjects) return res.status(404).send('Project users not found');
      res.status(200).json(userProjects);
    } catch (error) {
      next(error);
    }
  }

  async function PUT(req, res, next) {
    try {
      const { userId, projectId } = req.params;
      const { role } = req.body;
      const updatedUserProject = await updateUserProjectRole(userId, projectId, role);
      if (!updatedUserProject) return res.status(404).send('User-project association not found');
      res.status(200).json(updatedUserProject);
    } catch (error) {
      next(error);
    }
  }

  async function DELETE(req, res, next) {
    try {
      const { userId, projectId } = req.params;
      const result = await deleteUserProject(userId, projectId);
      if (result === 0) return res.status(404).send('User-project association not found');
      res.status(200).send('User-project association deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  return operations;
};
