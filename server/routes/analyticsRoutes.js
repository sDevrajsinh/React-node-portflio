const express = require('express');
const router = express.Router();
const { getAnalytics, trackVisitor } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', trackVisitor);
router.get('/', protect, getAnalytics);
router.get('/analytics', protect, getAnalytics);

module.exports = router;
