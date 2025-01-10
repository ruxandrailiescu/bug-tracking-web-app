const { getAllBugHistories, getBugHistoryById, createBugHistory, updateBugHistory, deleteBugHistory } = require('../services/bugs-history-services');

module.exports = function() {
  const operations = {
    GET_All_BugHistories,
    GET_BugHistory_By_Id,
    POST,
    PUT,
    DELETE,
  };

  async function GET_All_BugHistories(req, res, next) {
    try {
      const histories = await getAllBugHistories();
      res.status(200).json(histories);
    } catch (error) {
      next(error);
    }
  }

  async function GET_BugHistory_By_Id(req, res, next) {
    try {
      const { id } = req.params;
      const history = await getBugHistoryById(id);
      if (!history) return res.status(404).send('Bug history not found');
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }

  async function POST(req, res, next) {
    try {
      const newHistory = await createBugHistory(req.body);
      res.status(201).json(newHistory);
    } catch (error) {
      next(error);
    }
  }

  async function PUT(req, res, next) {
    try {
      const { id } = req.params;
      const updatedHistory = await updateBugHistory(id, req.body);
      if (!updatedHistory) return res.status(404).send('Bug history not found');
      res.status(200).json(updatedHistory);
    } catch (error) {
      next(error);
    }
  }

  async function DELETE(req, res, next) {
    try {
      const { id } = req.params;
      const rowsDeleted = await deleteBugHistory(id);
      if (rowsDeleted === 0) return res.status(404).send('Bug history not found');
      res.status(200).send('Bug history deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  return operations;
};
