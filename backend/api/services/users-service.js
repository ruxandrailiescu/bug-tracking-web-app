const User = require('../../db/models/User');

async function getAllUsers() {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error('Error retrieving users');
  }
}

async function getUserById(id) {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw new Error(`Error retrieving user with id: ${id}`);
  }
}

async function createUser(userData) {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error('Error creating new user');
  }
}

async function updateUser(id, userData) {
  try {
    const user = await User.findByPk(id);
    if (!user) return null;

    return await user.update(userData);
  } catch (error) {
    throw new Error(`Error updating user with id: ${id}`);
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) return 0;

    await user.destroy();
    return 1; 
  } catch (error) {
    throw new Error(`Error deleting user with id: ${id}`);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
