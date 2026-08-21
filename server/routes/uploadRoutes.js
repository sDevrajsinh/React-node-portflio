const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// 1. File Type Validator
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|gif|svg|bmp/i;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed!'));
  }
}

// 2. Storage Strategy (Cloudinary if configured, otherwise Local Disk)
let upload;
const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  try {
    const cloudinary = require('cloudinary').v2;
    const { CloudinaryStorage } = require('multer-storage-cloudinary');

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'portfolio',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp'],
      },
    });

    upload = multer({
      storage: storage,
      limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
    });
  } catch (err) {
    console.warn('[UPLOAD] Cloudinary init failed, falling back to local storage:', err.message);
  }
}

// Local Storage Fallback
if (!upload) {
  const localStorage = multer.diskStorage({
    destination(req, file, cb) {
      const dir = path.join(__dirname, '../uploads/');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename(req, file, cb) {
      const cleanName = path.basename(file.originalname, path.extname(file.originalname)).replace(/[^a-zA-Z0-9]/g, '_');
      cb(null, `${file.fieldname}-${cleanName}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

  upload = multer({
    storage: localStorage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });
}

// 3. Upload Route Handler with Error Guard
router.post('/', protect, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message || 'Error uploading file' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded. Please select an image file.' });
    }

    // Return S3 Location URL or local /uploads path
    const imageUrl = req.file.location || `/uploads/${req.file.filename}`;

    res.status(200).json({
      message: 'Image uploaded successfully',
      image: imageUrl,
    });
  });
});

module.exports = router;
