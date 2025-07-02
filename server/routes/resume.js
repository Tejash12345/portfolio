import express from 'express';
import Resume from '../models/Resume.js';
import cloudinary from '../cloudinary.js';

const router = express.Router();

// Upload/Update resume
router.post('/upload', async (req, res) => {
  try {
    const { data, filename, mimetype, size } = req.body;

    if (!data || !filename || !mimetype) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check file size (limit to 10MB)
    if (size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size too large. Maximum 10MB allowed.' });
    }

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(data, {
      folder: 'portfolio_resumes',
      public_id: 'resume',
      resource_type: 'auto'
    });

    // Update existing or create new with Cloudinary URL
    const resume = await Resume.findOneAndUpdate(
      {},
      { url: uploadRes.secure_url, filename, mimetype, size, uploadedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ 
      success: true, 
      message: 'Resume uploaded to Cloudinary',
      resumeId: resume._id,
      url: uploadRes.secure_url
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: 'Failed to upload resume to Cloudinary' });
  }
});

// Get resume
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: 'default_user' });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({
      success: true,
      data: resume.data,
      filename: resume.filename,
      mimetype: resume.mimetype,
      uploadedAt: resume.uploadedAt
    });
  } catch (error) {
    console.error('Resume fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// Delete resume
router.delete('/', async (req, res) => {
  try {
    const result = await Resume.findOneAndDelete({ userId: 'default_user' });

    if (!result) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Resume delete error:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;