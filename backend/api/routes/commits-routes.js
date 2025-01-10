const { getAllCommits, getCommitById, createCommit, deleteCommit } = require('../services/commits-services');

module.exports = function () {
  const operations = {
    GET_All_Commits,
    GET_Commit_By_Id,
    POST,
    DELETE,
  };

  async function GET_All_Commits(req, res, next) {
    try {
      const commits = await getAllCommits();
      res.status(200).json(commits);
    } catch (error) {
      next(error);
    }
  }

  async function GET_Commit_By_Id(req, res, next) {
    try {
      const { id } = req.params;
      const commit = await getCommitById(id);
      if (!commit) return res.status(404).send('Commit not found');
      res.status(200).json(commit);
    } catch (error) {
      next(error);
    }
  }

  async function POST(req, res, next) {
    try {
      const newCommit = await createCommit(req.body);
      res.status(201).json(newCommit);
    } catch (error) {
      next(error);
    }
  }

  async function DELETE(req, res, next) {
    try {
      const { id } = req.params;
      const rowsDeleted = await deleteCommit(id);
      if (rowsDeleted === 0) return res.status(404).send('Commit not found');
      res.status(200).send('Commit deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  return operations;
};
