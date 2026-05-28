const Content = require('../models/Content');
const Activity = require('../models/Activity');
const fs = require('fs');

// GET /api/content/tracking/:studentId — get all docs with viewed status for a student
const getTracking = async (req, res) => {
  try {
    const Student = require('../models/Student');
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const docs = await Content.find({ batch: student.assignedBatch })
      .populate('uploadedBy', 'name')
      .select('title module viewedBy createdAt');

    const result = docs.map(d => ({
      id: d._id,
      title: d.title,
      module: d.module,
      uploadedAt: d.createdAt,
      viewed: d.viewedBy?.some(uid => uid.toString() === student.user.toString()) || false,
    }));

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const { batch, type, module: mod } = req.query;
    const filter = {};
    if (batch) filter.batch = batch;
    if (type) filter.type = type;
    if (mod) filter.module = mod;

    // Students only see content for their batch
    if (req.user.role === 'student') {
      const Student = require('../models/Student');
      const student = await Student.findOne({ user: req.user._id });
      if (student) filter.batch = student.assignedBatch;
    }

    const content = await Content.find(filter)
      .populate('uploadedBy', 'name')
      .populate('batch', 'name')
      .sort('-createdAt');
    res.json({ success: true, data: content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    // Increment view count and track viewer
    const updateOp = {
      $inc: { views: 1 },
      $addToSet: { viewedBy: req.user._id },
    };

    const content = await Content.findByIdAndUpdate(req.params.id, updateOp, { new: true })
      .populate('uploadedBy', 'name')
      .populate('batch', 'name');

    if (!content) return res.status(404).json({ success: false, message: 'Content not found' });

    // If student viewed, update their progress based on % of batch docs viewed
    if (req.user.role === 'student') {
      const Student = require('../models/Student');
      const student = await Student.findOne({ user: req.user._id });
      if (student) {
        // Count total docs in student's batch
        const totalDocs = await Content.countDocuments({ batch: student.assignedBatch });
        // Count docs this student has viewed
        const viewedDocs = await Content.countDocuments({
          batch: student.assignedBatch,
          viewedBy: req.user._id,
        });
        const progress = totalDocs > 0 ? Math.round((viewedDocs / totalDocs) * 100) : 0;
        await Student.findByIdAndUpdate(student._id, { progress, lastActive: new Date() });
      }
    }

    res.json({ success: true, data: content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, description, type, module: mod, lesson, batch } = req.body;
    const fileData = req.file ? {
      fileUrl: `/uploads/documents/${req.file.filename}`,
      fileName: req.file.originalname,
      fileSize: `${(req.file.size / (1024 * 1024)).toFixed(1)} MB`,
    } : {};

    const content = await Content.create({
      title, description, type, module: mod, lesson, batch,
      uploadedBy: req.user._id,
      ...fileData,
    });

    await Activity.create({
      user: req.user._id,
      action: 'Created',
      target: `Content: ${title}`,
      category: 'Content Management',
      details: `Uploaded new ${type}`,
    });

    res.status(201).json({ success: true, data: content });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!content) return res.status(404).json({ success: false, message: 'Content not found' });
    res.json({ success: true, data: content });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ success: false, message: 'Content not found' });

    // Delete file from disk
    if (content.fileUrl) {
      const filePath = content.fileUrl.replace('/uploads/', 'uploads/');
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Content.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getTracking, getAll, getOne, create, update, remove };
