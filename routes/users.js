const express = require('express');
const router = express.Router();
const { getUserById, getUsersByCollege } = require('../controllers/userController');

// GET /Users/college?college_name=Example College
router.get('/college', getUsersByCollege);

// GET /Users/:id
router.get('/:id', getUserById);

module.exports = router; 