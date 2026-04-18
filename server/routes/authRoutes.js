const express = require('express');
const router = express.Router();
const { login, requestOTP, updateCredentials, getMe, verifyOTP, getPublicProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/public-profile', getPublicProfile);
router.get('/me', protect, getMe);
router.post('/request-otp', protect, requestOTP);
router.post('/verify-otp', protect, verifyOTP);
router.post('/update-credentials', protect, updateCredentials);

module.exports = router;
