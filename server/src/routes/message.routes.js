const express = require('express');
const router = express.Router();
const { getUsers, getConversations, getMessages, send } = require('../controllers/message.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/users', getUsers);
router.get('/conversations', getConversations);
router.get('/:userId', getMessages);
router.post('/', send);

module.exports = router;
