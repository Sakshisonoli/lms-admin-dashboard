const User = require('../models/User');
const Staff = require('../models/Staff');
const Activity = require('../models/Activity');

const getAll = async (req, res) => {
  try {
    const staff = await Staff.find().populate('user', 'name email phone status joinDate');
    res.json({ success: true, data: staff });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate('user');
    if (!staff) return res.status(404).json({ success: false, message: 'Staff not found' });
    res.json({ success: true, data: staff });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, email, password, phone, staffRole, department, permissions, status } = req.body;

    const user = await User.create({ name, email, password, phone, role: 'admin', status });
    const staff = await Staff.create({ user: user._id, staffRole, department, permissions });

    await Activity.create({
      user: req.user._id,
      action: 'Created',
      target: `New Staff: ${name}`,
      category: 'User Management',
      details: `Created staff account for ${name}`,
    });

    res.status(201).json({ success: true, data: { ...staff.toObject(), user } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, phone, staffRole, department, permissions, status } = req.body;
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ success: false, message: 'Staff not found' });

    await User.findByIdAndUpdate(staff.user, { name, email, phone, status });
    const updated = await Staff.findByIdAndUpdate(
      req.params.id,
      { staffRole, department, permissions },
      { new: true }
    ).populate('user');

    await Activity.create({
      user: req.user._id,
      action: 'Updated',
      target: `Staff: ${name}`,
      category: 'User Management',
      details: `Updated staff profile`,
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate('user');
    if (!staff) return res.status(404).json({ success: false, message: 'Staff not found' });

    await User.findByIdAndDelete(staff.user._id);
    await Staff.findByIdAndDelete(req.params.id);

    await Activity.create({
      user: req.user._id,
      action: 'Deleted',
      target: `Staff: ${staff.user.name}`,
      category: 'User Management',
      details: `Deleted staff account`,
    });

    res.json({ success: true, message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
