const Notification = require('../models/Notification');

const getAll = async (req, res) => {
  try {
    let filter = { status: 'Active' };

    if (req.user.role === 'admin') {
      filter.createdBy = req.user._id;
    } else {
      // Exclude notifications this user has dismissed
      filter.$or = [{ targetRole: 'all' }, { targetRole: req.user.role }];
      filter.dismissedBy = { $ne: req.user._id };
    }

    const notifications = await Notification.find(filter)
      .populate('createdBy', 'name')
      .sort('-createdAt');
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const dismiss = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      $addToSet: { dismissedBy: req.user._id },
    });
    res.json({ success: true, message: 'Notification dismissed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const notification = await Notification.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, data: notification });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, message: req.body.message, type: req.body.type, targetRole: req.body.targetRole },
      { new: true }
    );
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.json({ success: true, data: notification });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const markRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      $addToSet: { readBy: req.user._id },
    });
    res.json({ success: true, message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, update, markRead, dismiss, remove };
