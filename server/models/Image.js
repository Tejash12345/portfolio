import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
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

export default mongoose.model('Image', imageSchema);