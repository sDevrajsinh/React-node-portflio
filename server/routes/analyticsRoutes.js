const express = require('express');
const router = express.Router();
const { getAnalytics, trackVisitor } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.post('/visit', trackVisitor);
router.get('/analytics', protect, getAnalytics);

module.exports = router;
