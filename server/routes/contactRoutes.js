const express = require('express');
const router = express.Router();
const { submitContact, getMessages, markMessageAsRead } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleGuard');

router.route('/').post(submitContact).get(protect, requireRole('admin'), getMessages);
router.route('/:id/read').patch(protect, requireRole('admin'), markMessageAsRead);

module.exports = router;
