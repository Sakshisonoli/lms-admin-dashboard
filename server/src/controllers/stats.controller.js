const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const Batch = require('../models/Batch');
const Content = require('../models/Content');
const Query = require('../models/Query');
const Activity = require('../models/Activity');

const getStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalTeachers,
      totalStaff,
      totalBatches,
      activeBatches,
      totalContent,
      totalQueries,
      pendingQueries,
      resolvedQueries,
      recentActivities,
      batches,
    ] = await Promise.all([
      User.countDocuments(),
      Student.countDocuments(),
      Teacher.countDocuments(),
      Staff.countDocuments(),
      Batch.countDocuments(),
      Batch.countDocuments({ status: 'Active' }),
      Content.countDocuments(),
      Query.countDocuments(),
      Query.countDocuments({ status: 'pending' }),
      Query.countDocuments({ status: 'resolved' }),
      Activity.find().populate('user', 'name').sort('-createdAt').limit(6),
      Batch.find()
        .populate('students')
        .populate('teachers')
        .select('name students teachers status'),
    ]);

    // Calculate real avg response time from resolved queries
    const resolvedWithTime = await Query.find({ status: 'resolved', updatedAt: { $exists: true } })
      .select('createdAt updatedAt').limit(50);
    let avgResponseHours = null;
    if (resolvedWithTime.length > 0) {
      const totalMs = resolvedWithTime.reduce((sum, q) => sum + (new Date(q.updatedAt) - new Date(q.createdAt)), 0);
      avgResponseHours = (totalMs / resolvedWithTime.length / 3600000).toFixed(1);
    }

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students: totalStudents,
          teachers: totalTeachers,
          staff: totalStaff,
          admins: totalStaff, // staff are admins
        },
        batches: {
          total: totalBatches,
          active: activeBatches,
          details: batches.map(b => ({
            name: b.name,
            students: b.students?.length || 0,
            teachers: b.teachers?.length || 0,
            status: b.status,
          })),
        },
        content: {
          total: totalContent,
        },
        queries: {
          total: totalQueries,
          pending: pendingQueries,
          resolved: resolvedQueries,
          avgResponseTime: avgResponseHours ? `${avgResponseHours} hours` : 'N/A',
        },
        recentActivities: recentActivities.map(a => ({
          user: a.user?.name || 'Unknown',
          action: a.action,
          target: a.target,
          category: a.category,
          time: timeAgo(a.createdAt),
          type: getActivityType(a.action),
        })),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Helper: convert date to "X hours ago"
function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return `${seconds} secs ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

function getActivityType(action) {
  const a = action?.toLowerCase();
  if (a === 'created') return 'completion';
  if (a === 'deleted') return 'download';
  if (a?.includes('login')) return 'query';
  return 'view';
}

module.exports = { getStats };
