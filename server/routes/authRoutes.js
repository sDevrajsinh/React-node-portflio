const express = require('express');
const router = express.Router();
const { login, requestOTP, updateCredentials, getMe, verifyOTP, getPublicProfile, refreshAccessToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleGuard');

router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);
router.get('/public-profile', getPublicProfile);
router.get('/me', protect, getMe);
router.post('/request-otp', protect, requestOTP);
router.post('/verify-otp', protect, verifyOTP);
router.post('/update-credentials', protect, requireRole('admin'), updateCredentials);

module.exports = router;
