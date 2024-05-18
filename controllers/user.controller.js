const dbuser = require('../models/user.models.js');

const getUserByID = async (req, res) => {
    try {
      const user = await dbuser.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
}

const createUser = async (req, res) => {
    try {
      const user = {
        email: req.body.email,
        pw_hash: req.body.pw_hash,
        pw_salt: req.body.pw_salt,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
      const result = await dbuser.create(user);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
}

const updateUser = async (req, res) => {
    try {
      const {id} = req.params;
      const user = {
        pw_hash: req.body.pw_hash,
        pw_salt: req.body.pw_salt,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
      const result = dbuser.updateUser(id, user);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    try {
      const {id} = req.params;
      const result = dbuser.deleteByID(id);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'No user found to delete' });
      }
      return res.status(204).json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}