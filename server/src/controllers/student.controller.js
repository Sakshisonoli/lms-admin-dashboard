const User = require('../models/User');
const Student = require('../models/Student');
const Activity = require('../models/Activity');

const getAll = async (req, res) => {
  try {
    const { batch } = req.query;
    const filter = {};
    if (batch) filter.assignedBatch = batch;

    // Teachers can only see students in their batches
    if (req.user.role === 'teacher') {
      const Teacher = require('../models/Teacher');
      const teacher = await Teacher.findOne({ user: req.user._id });
      if (teacher) filter.assignedBatch = { $in: teacher.assignedBatches };
    }

    const students = await Student.find(filter)
      .populate('user', 'name email phone status joinDate')
      .populate('assignedBatch', 'name');
    res.json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user')
      .populate('assignedBatch');
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, email, password, phone, assignedBatch, status } = req.body;

    const count = await Student.countDocuments();
    const enrollmentId = `STU${new Date().getFullYear()}${String(count + 1).padStart(3, '0')}`;

    const user = await User.create({ name, email, password, phone, role: 'student', status });
    const student = await Student.create({ user: user._id, assignedBatch, enrollmentId });

    await Activity.create({
      user: req.user._id,
      action: 'Created',
      target: `New Student: ${name}`,
      category: 'User Management',
      details: `Created student account with enrollment ID ${enrollmentId}`,
    });

    res.status(201).json({ success: true, data: { ...student.toObject(), user } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, phone, assignedBatch, progress, status } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    await User.findByIdAndUpdate(student.user, { name, email, phone, status });
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { assignedBatch, progress },
      { new: true }
    ).populate('user').populate('assignedBatch', 'name');

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('user');
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    await User.findByIdAndDelete(student.user._id);
    await Student.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
