const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleGuard');

router.get('/', getSettings); // Public access to check maintenance mode
router.put('/', protect, requireRole('admin'), updateSettings);

module.exports = router;
