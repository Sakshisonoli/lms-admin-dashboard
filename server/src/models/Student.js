const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrollmentId: { type: String, unique: true },
    assignedBatch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    progress: { type: Number, default: 0 },
    lastActive: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
