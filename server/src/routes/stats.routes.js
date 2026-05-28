const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/stats.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.get('/', protect, restrictTo('admin'), getStats);

module.exports = router;
