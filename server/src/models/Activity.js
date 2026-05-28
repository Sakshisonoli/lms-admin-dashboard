const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    target: { type: String, required: true },
    category: { type: String, required: true },
    details: { type: String },
    status: { type: String, enum: ['Success', 'Failed'], default: 'Success' },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
