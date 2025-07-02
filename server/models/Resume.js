import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'default_user',
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Resume', resumeSchema);