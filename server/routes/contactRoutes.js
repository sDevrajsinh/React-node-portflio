const express = require('express');
const router = express.Router();
const { submitContact, getMessages, markMessageAsRead } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(submitContact).get(protect, getMessages);
router.route('/:id/read').patch(protect, markMessageAsRead);

module.exports = router;
