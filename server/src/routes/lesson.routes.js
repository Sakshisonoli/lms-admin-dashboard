const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/lesson.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', restrictTo('admin', 'teacher'), create);
router.put('/:id', restrictTo('admin', 'teacher'), update);
router.delete('/:id', restrictTo('admin', 'teacher'), remove);

module.exports = router;
