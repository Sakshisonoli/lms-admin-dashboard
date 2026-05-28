const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const Message = require('../models/Message');
const Query = require('../models/Query');
const Notification = require('../models/Notification');

router.get('/', protect, async (req, res) => {
  try {
    const [unreadMessages, unreadNotifications] = await Promise.all([
      Message.countDocuments({ receiver: req.user._id, isRead: false }),
      Notification.countDocuments({
        status: 'Active',
        readBy: { $ne: req.user._id },
        $or: [{ targetRole: 'all' }, { targetRole: req.user.role }],
      }),
    ]);

    // Pending queries — for teacher sidebar badge only (not notification bell)
    let pendingQueries = 0;
    if (req.user.role === 'teacher') {
      // Unseen pending queries for teacher
      pendingQueries = await Query.countDocuments({
        status: 'pending',
        seenBy: { $ne: req.user._id },
      });
    }
    // For student: count resolved queries they haven't seen yet
    let newReplies = 0;
    if (req.user.role === 'student') {
      newReplies = await Query.countDocuments({
        student: req.user._id,
        status: 'resolved',
        seenBy: { $ne: req.user._id },
      });
    }

    res.json({
      success: true,
      data: {
        messages: unreadMessages,
        notifications: unreadNotifications,
        pendingQueries,   // teacher: pending student queries
        newReplies,       // student: queries that got replies
        // Bell badge = only messages + notifications (no queries)
        total: unreadMessages + unreadNotifications,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
