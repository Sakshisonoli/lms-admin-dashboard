const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Activity = require('../models/Activity');

const getAll = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate('user', 'name email phone status joinDate')
      .populate('assignedBatches', 'name');
    res.json({ success: true, data: teachers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('user')
      .populate('assignedBatches');
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.json({ success: true, data: teacher });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, email, password, phone, rank, specialization, experience, courses, status } = req.body;

    const user = await User.create({ name, email, password, phone, role: 'teacher', status });
    const teacher = await Teacher.create({ user: user._id, rank, specialization, experience, courses });

    await Activity.create({
      user: req.user._id,
      action: 'Created',
      target: `New Teacher: ${name}`,
      category: 'User Management',
      details: `Created teacher account for ${name}`,
    });

    res.status(201).json({ success: true, data: { ...teacher.toObject(), user } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, phone, rank, specialization, experience, courses, assignedBatches, status } = req.body;
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });

    await User.findByIdAndUpdate(teacher.user, { name, email, phone, status });
    const updated = await Teacher.findByIdAndUpdate(
      req.params.id,
      { rank, specialization, experience, courses, assignedBatches },
      { new: true }
    ).populate('user').populate('assignedBatches', 'name');

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('user');
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });

    await User.findByIdAndDelete(teacher.user._id);
    await Teacher.findByIdAndDelete(req.params.id);

    await Activity.create({
      user: req.user._id,
      action: 'Deleted',
      target: `Teacher: ${teacher.user.name}`,
      category: 'User Management',
      details: `Deleted teacher account`,
    });

    res.json({ success: true, message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
