const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Activity = require('../models/Activity');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Email, password and role are required' });
    }

    const user = await User.findOne({ email, role }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      // Log failed login
      await Activity.create({
        user: user?._id || new (require('mongoose').Types.ObjectId)(),
        action: 'Failed Login',
        target: 'Admin Panel Access',
        category: 'Security',
        status: 'Failed',
        details: `Failed login attempt for ${email}`,
      }).catch(() => {});
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.status === 'Inactive') {
      return res.status(403).json({ success: false, message: 'Account is inactive' });
    }

    const token = signToken(user._id);

    // Attach extra profile data based on role
    let extraData = {};
    if (user.role === 'student') {
      const Student = require('../models/Student');
      const student = await Student.findOne({ user: user._id }).populate('assignedBatch', 'name');
      if (student) {
        extraData.assignedBatch = student.assignedBatch?.name || null;
        extraData.enrollmentId = student.enrollmentId;
      }
    } else if (user.role === 'teacher') {
      const Teacher = require('../models/Teacher');
      const teacher = await Teacher.findOne({ user: user._id }).populate('assignedBatches', 'name');
      if (teacher) {
        extraData.assignedBatches = teacher.assignedBatches?.map(b => b.name) || [];
        extraData.specialization = teacher.specialization;
        extraData.rank = teacher.rank;
      }
    }

    // Log successful login
    await Activity.create({
      user: user._id,
      action: 'Login',
      target: 'System',
      category: 'Security',
      details: `User ${user.name} logged in`,
    }).catch(() => {});

    res.json({ success: true, token, user: { ...user.toJSON(), ...extraData } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// PUT /api/auth/change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { login, getMe, changePassword };
