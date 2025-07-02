import express from 'express';
import Image from '../models/Image.js';
import cloudinary from '../cloudinary.js';

const router = express.Router();

// Upload/Update image
router.post('/upload', async (req, res) => {
  try {
    const { key, data, filename, mimetype, size } = req.body;

    if (!key || !data || !filename || !mimetype) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check file size (limit to 10MB)
    if (size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size too large. Maximum 10MB allowed.' });
    }

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(data, {
      folder: 'portfolio_images',
      public_id: key,
      resource_type: 'auto'
    });

    // Update existing or create new with Cloudinary URL
    const image = await Image.findOneAndUpdate(
      { key },
      { url: uploadRes.secure_url, filename, mimetype, size, uploadedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ 
      success: true, 
      message: 'Image uploaded to Cloudinary',
      imageId: image._id,
      url: uploadRes.secure_url
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
  }
});

// Get specific image
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const image = await Image.findOne({ key });

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({
      success: true,
      data: image.data,
      filename: image.filename,
      mimetype: image.mimetype,
      uploadedAt: image.uploadedAt
    });
  } catch (error) {
    console.error('Image fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// Get all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find({}).select('key filename mimetype size uploadedAt');
    
    const imageMap = {};
    images.forEach(img => {
      imageMap[img.key] = {
        filename: img.filename,
        mimetype: img.mimetype,
        size: img.size,
        uploadedAt: img.uploadedAt
      };
    });

    res.json({ success: true, images: imageMap });
  } catch (error) {
    console.error('Images fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Delete image
router.delete('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const result = await Image.findOneAndDelete({ key });

    if (!result) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Image delete error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;