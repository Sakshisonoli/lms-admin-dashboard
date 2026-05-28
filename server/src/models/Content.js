const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['Document', 'Video', 'Assessment'], required: true },
    module: { type: String, required: true },
    lesson: { type: String },
    fileUrl: { type: String },
    fileName: { type: String },
    fileSize: { type: String },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    views: { type: Number, default: 0 },
    viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
