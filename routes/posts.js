const express = require('express');
const router = express.Router();
const { getPostsByType } = require('../controllers/postController');

// GET /posts?type=event | normal | opportunity
router.get('/', getPostsByType);

module.exports = router;
