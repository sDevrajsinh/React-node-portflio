const express = require('express');
const router = express.Router();
const { getAnalytics, trackVisitor } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleGuard');

router.post('/', trackVisitor);
router.get('/', protect, requireRole('admin'), getAnalytics);

module.exports = router;
