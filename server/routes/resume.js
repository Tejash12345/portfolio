// routes/resume.js

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const uploadDir = path.join(process.cwd(), 'uploads');
const resumePath = path.join(uploadDir, 'uploaded_resume.pdf');
const defaultResumePath = path.join(uploadDir, 'default_resume.pdf');

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config for local file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, 'uploaded_resume.pdf');
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Upload new resume
router.post('/upload', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    success: true,
    message: 'Resume uploaded successfully',
    filename: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  });
});

// Download resume (uploaded or fallback)
router.get('/', (req, res) => {
  const filePath = fs.existsSync(resumePath) ? resumePath : defaultResumePath;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Resume not found' });
  }

  res.download(filePath, 'Arava_Tejesh_Kumar_Resume.pdf');
});

// Delete uploaded resume
router.delete('/', (req, res) => {
  if (fs.existsSync(resumePath)) {
    fs.unlinkSync(resumePath);
    return res.json({ success: true, message: 'Uploaded resume deleted' });
  }

  res.status(404).json({ error: 'No uploaded resume found to delete' });
});

export default router;
