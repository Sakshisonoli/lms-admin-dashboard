const express = require('express');
const router = express.Router();
const { getAll, create, reply, markSeen, remove } = require('../controllers/query.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/', getAll);
router.post('/', create);
router.put('/seen', markSeen);
router.put('/:id/reply', restrictTo('teacher', 'admin'), reply);
router.delete('/:id', restrictTo('admin', 'teacher'), remove);

module.exports = router;
