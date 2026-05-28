const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/teacher.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', restrictTo('admin'), create);
router.put('/:id', restrictTo('admin'), update);
router.delete('/:id', restrictTo('admin'), remove);

module.exports = router;
