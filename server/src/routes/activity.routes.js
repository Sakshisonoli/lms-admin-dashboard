const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/activity.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect, restrictTo('admin'));
router.get('/', getAll);

module.exports = router;
