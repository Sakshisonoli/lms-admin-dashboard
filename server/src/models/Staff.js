const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    department: { type: String, required: true },
    staffRole: { type: String, required: true }, // Admin, Manager, Coordinator etc.
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Staff', staffSchema);
