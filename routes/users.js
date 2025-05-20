const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/userController');

// GET /users/:id
router.get('/:id', getUserById);

module.exports = router; 