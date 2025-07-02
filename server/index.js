// index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Routes
import resumeRoutes from './routes/resume.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploads folder (for PDF download)
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Serve static frontend (if using React/Vite build)
app.use(express.static(join(__dirname, '../dist')));

// API Routes
app.use('/api/resume', resumeRoutes);

// React fallback
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
