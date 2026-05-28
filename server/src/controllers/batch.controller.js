const Batch = require('../models/Batch');
const Activity = require('../models/Activity');

const getAll = async (req, res) => {
  try {
    const batches = await Batch.find()
      .populate('teachers', 'user')
      .populate('students', 'user');
    res.json({ success: true, data: batches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id)
      .populate({ path: 'teachers', populate: { path: 'user', select: 'name email' } })
      .populate({ path: 'students', populate: { path: 'user', select: 'name email' } });
    if (!batch) return res.status(404).json({ success: false, message: 'Batch not found' });
    res.json({ success: true, data: batch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const batch = await Batch.create(req.body);
    await Activity.create({
      user: req.user._id,
      action: 'Created',
      target: `New Batch: ${batch.name}`,
      category: 'Batch Management',
      details: `Created new batch`,
    });
    res.status(201).json({ success: true, data: batch });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!batch) return res.status(404).json({ success: false, message: 'Batch not found' });
    res.json({ success: true, data: batch });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);
    if (!batch) return res.status(404).json({ success: false, message: 'Batch not found' });
    await Activity.create({
      user: req.user._id,
      action: 'Deleted',
      target: `Batch: ${batch.name}`,
      category: 'Batch Management',
      details: `Deleted batch`,
    });
    res.json({ success: true, message: 'Batch deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
