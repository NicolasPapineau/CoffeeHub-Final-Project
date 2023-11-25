const express = require('express');
const router = express.Router();

const checkAuth = async (req, res) => {
  if (req.session.userId) {
    // User is authenticated
    return res.status(200).json({ authenticated: true });
  } else {
    // User is not authenticated
    return res.status(401).json({ authenticated: false });
  }
};

module.exports = checkAuth;