const Activity = require('../models/Activity');

const getAll = async (req, res) => {
  try {
    const { action, category } = req.query;
    const filter = {};
    if (action && action !== 'all') filter.action = new RegExp(action, 'i');
    if (category && category !== 'all') filter.category = new RegExp(category, 'i');

    const activities = await Activity.find(filter)
      .populate('user', 'name')
      .sort('-createdAt')
      .limit(100);
    res.json({ success: true, data: activities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll };
