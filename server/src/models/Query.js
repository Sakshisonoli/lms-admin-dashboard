const mongoose = require('mongoose');

const querySchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
    question: { type: String, required: true },
    postType: { type: String, enum: ['question', 'comment'], default: 'question' },
    reply: { type: String },
    status: { type: String, enum: ['pending', 'resolved', 'comment'], default: 'pending' },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Query', querySchema);
