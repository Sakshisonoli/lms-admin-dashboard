const Query = require('../models/Query');

const getAll = async (req, res) => {
  try {
    const filter = {};
    // If content ID is passed as query param, filter by it
    if (req.query.content) filter.content = req.query.content;

    // Students only see their own queries (unless filtering by content)
    if (req.user.role === 'student' && !req.query.content) {
      filter.student = req.user._id;
    }
    // Teachers see queries for their batches
    if (req.user.role === 'teacher' && !req.query.content) {
      const Teacher = require('../models/Teacher');
      const teacher = await Teacher.findOne({ user: req.user._id });
      if (teacher) filter.batch = { $in: teacher.assignedBatches };
    }

    const queries = await Query.find(filter)
      .populate('student', 'name email role')
      .populate('teacher', 'name email role')
      .populate('content', 'title')
      .populate('batch', 'name')
      .sort('-createdAt');
    res.json({ success: true, data: queries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    let batchId = null;
    if (req.user.role === 'student') {
      const Student = require('../models/Student');
      const student = await Student.findOne({ user: req.user._id });
      batchId = student?.assignedBatch || null;
    }
    const postType = req.body.postType || 'question';
    const query = await Query.create({
      ...req.body,
      postType,
      status: postType === 'comment' ? 'comment' : 'pending',
      student: req.user._id,
      batch: batchId,
    });

    const Notification = require('../models/Notification');
    const typeLabel = postType === 'comment' ? 'Comment' : 'Question';
    const preview = req.body.question?.substring(0, 100) || '';

    if (req.user.role === 'student') {
      // Student posted → notify teachers
      await Notification.create({
        title: `New ${typeLabel} from ${req.user.name}`,
        message: preview,
        type: 'Info',
        targetRole: 'teacher',
        createdBy: req.user._id,
      }).catch(() => {});
    } else {
      // Teacher/admin posted → notify students AND teachers (use 'all' so everyone sees it)
      await Notification.create({
        title: `${req.user.name} posted a ${typeLabel.toLowerCase()}`,
        message: preview,
        type: 'Info',
        targetRole: 'all',
        createdBy: req.user._id,
      }).catch(() => {});
    }

    res.status(201).json({ success: true, data: query });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const reply = async (req, res) => {
  try {
    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { reply: req.body.reply, status: 'resolved', teacher: req.user._id },
      { new: true }
    ).populate('student', 'name email role').populate('teacher', 'name email role');
    if (!query) return res.status(404).json({ success: false, message: 'Query not found' });

    // Notify everyone that the question was answered
    const Notification = require('../models/Notification');
    await Notification.create({
      title: `${req.user.name} replied to a question`,
      message: req.body.reply?.substring(0, 100) || 'A question has been answered',
      type: 'Info',
      targetRole: 'all',
      createdBy: req.user._id,
    }).catch(() => {});

    res.json({ success: true, data: query });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const markSeen = async (req, res) => {
  try {
    // Mark all queries visible to this user as seen by them
    const filter = {};
    if (req.user.role === 'student') filter.student = req.user._id;
    if (req.user.role === 'teacher') {
      const Teacher = require('../models/Teacher');
      const teacher = await Teacher.findOne({ user: req.user._id });
      if (teacher) filter.batch = { $in: teacher.assignedBatches };
    }
    await Query.updateMany(filter, { $addToSet: { seenBy: req.user._id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Query.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Query deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, reply, markSeen, remove };
