const express = require('express');
const router = express.Router();
const { getAll, create, update, markRead, dismiss, remove } = require('../controllers/notification.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/', getAll);
router.post('/', restrictTo('admin'), create);
router.put('/:id/read', markRead);
router.put('/:id/dismiss', dismiss);
router.put('/:id', restrictTo('admin'), update);
router.delete('/:id', restrictTo('admin'), remove);

module.exports = router;
