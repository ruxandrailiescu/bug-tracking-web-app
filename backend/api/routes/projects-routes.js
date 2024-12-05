const { getAllProjects, getProjectById, createProject, updateProject, deleteProject } = require('../services/projects-services');

module.exports = function() {
  const operations = {
    GET_All_Projects,
    GET_Project_By_Id,
    POST,
    PUT,
    DELETE,

  };

  async function GET_All_Projects(req, res, next) {
    try {
      const projects = await getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }

  async function GET_Project_By_Id(req, res, next) {
    try {
      const { id } = req.params;
      const project = await getProjectById(id);
      if (!project) return res.status(404).send('Project not found');
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }

  async function POST(req, res, next) {
    console.log('POST /projects route was hit');
    try {
      console.log('Request Body:', req.body);
      const newProject = await createProject(req.body);
      console.log('Created Project:', newProject);
      res.status(200).json(newProject); // 201 Created
    } catch (error) {
        console.error('Error in POST /projects:', error);
        next(error);
    }
  }

  async function PUT(req, res, next) {
    try {
      const { id } = req.params;
      const updatedProject = await updateProject(id, req.body);
      if (!updatedProject) return res.status(404).send('Project not found');
      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }

  async function DELETE(req, res, next) {
    try {
      const { id } = req.params;
      const rowsDeleted = await deleteProject(id);
      if (rowsDeleted === 0) return res.status(404).send('Project not found');
      res.status(200).send('Project deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  return operations;
};
