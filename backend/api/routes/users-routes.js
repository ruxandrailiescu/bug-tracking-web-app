const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../services/users-service');

module.exports = function() {
  const operations = {
    GET_All_Users,
    GET_User_By_Id,
    POST,
    PUT,
    DELETE,
  };

  async function GET_All_Users(req, res, next) {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async function GET_User_By_Id(req, res, next) {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      if (!user) return res.status(404).send('User not found');
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async function POST(req, res, next) {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async function PUT(req, res, next) {
    try {
      const { id } = req.params;
      const updatedUser = await updateUser(id, req.body);
      if (!updatedUser) return res.status(404).send('User not found');
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async function DELETE(req, res, next) {
    try {
      const { id } = req.params;
      const rowsDeleted = await deleteUser(id);
      if (rowsDeleted === 0) return res.status(404).send('User not found');
      res.status(200).send('User deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  return operations;
};
