const express = require('express');
const router = express.Router();
const { getTracking, getAll, getOne, create, update, remove } = require('../controllers/content.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.use(protect);
router.get('/tracking/:studentId', restrictTo('admin', 'teacher'), getTracking);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', restrictTo('admin', 'teacher'), upload.single('file'), create);
router.put('/:id', restrictTo('admin', 'teacher'), update);
router.delete('/:id', restrictTo('admin', 'teacher'), remove);

module.exports = router;
