const Lesson = require('../models/Lesson');

const getAll = async (req, res) => {
  try {
    const { batch } = req.query;
    const filter = {};
    if (batch) filter.batch = batch;

    if (req.user.role === 'student') {
      const Student = require('../models/Student');
      const student = await Student.findOne({ user: req.user._id });
      if (student) filter.batch = student.assignedBatch;
    }

    const lessons = await Lesson.find(filter)
      .populate('batch', 'name')
      .populate({ path: 'teacher', populate: { path: 'user', select: 'name' } })
      .sort('order');
    res.json({ success: true, data: lessons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('batch', 'name')
      .populate('content');
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
    res.json({ success: true, data: lesson });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json({ success: true, data: lesson });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
    res.json({ success: true, data: lesson });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Lesson deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
