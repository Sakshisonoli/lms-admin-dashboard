const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: String },
    specialization: { type: String },
    experience: { type: String },
    assignedBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
    courses: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);
