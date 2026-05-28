const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    status: { type: String, enum: ['Active', 'Inactive', 'Completed'], default: 'Active' },
    startDate: { type: Date },
    endDate: { type: Date },
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    maxStudents: { type: Number, default: 50 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Batch', batchSchema);
