const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['General', 'Urgent', 'Info', 'Warning'], default: 'General' },
    targetRole: { type: String, enum: ['all', 'admin', 'teacher', 'student'], default: 'all' },
    targetBatch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dismissedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
