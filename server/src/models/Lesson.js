const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    module: { type: String, required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    scheduledDate: { type: Date },
    duration: { type: String },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
