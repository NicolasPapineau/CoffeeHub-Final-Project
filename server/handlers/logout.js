const express = require('express');
const router = express.Router();

const logout = async (req, res) => {
  // Destroy the session on logout
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: 'Logout successful' });
  });
};

module.exports = logout;