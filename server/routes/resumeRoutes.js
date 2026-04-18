const express = require('express');
const router = express.Router();
const { trackDownload, getDownloads } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(trackDownload).get(protect, getDownloads);

module.exports = router;
