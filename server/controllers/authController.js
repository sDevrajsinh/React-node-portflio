const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/emailSender');

// Simple in-memory storage for OTP (In production, use Redis or a DB collection)
let otpStore = {};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide both username and password' });
  }

  try {
    const user = await User.findOne({ username });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(`[AUTH FAILURE] Login error: ${error.message}`);
    res.status(500).json({ message: `SERVER ERROR: ${error.message}` });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findOne({}).select('-password');
    res.json(user);
  } catch (error) {
    console.error(`[PROFILE FETCH ERROR] ${error.message}`);
    res.status(500).json({ message: `Database Link Severed: ${error.message}` });
  }
};

const requestOTP = async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Cache the OTP with 5 minute expiry
    otpStore['admin_otp'] = { 
      code: otp, 
      expiresAt: Date.now() + (5 * 60 * 1000) 
    };

    console.log(`[SECURITY] Admin Update OTP Generated: ${otp}`);
    
    // Send OTP via Email
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: 'Admin Security Override Code',
        message: `Your security override code is: ${otp}. This code is valid for 5 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #00ff88; border-radius: 10px; background-color: #0a0a0a; color: #ffffff;">
            <h2 style="color: #00ff88;">Security Verification</h2>
            <p>You requested a security override code to update your admin credentials.</p>
            <p style="font-size: 24px; font-weight: bold; background: #1a1a1a; padding: 10px; border-radius: 5px; text-align: center; color: #00ff88;">${otp}</p>
            <p style="font-size: 0.8rem; color: #808080;">This code will expire in 5 minutes. If you did not request this, please secure your account immediately.</p>
          </div>
        `
      });

      res.json({ 
        success: true, 
        message: 'Security OTP has been sent to your registered email.' 
      });
    } catch (mailError) {
      console.error('Email Error:', mailError);
      res.status(500).json({ message: 'Error sending email. Please check your SMTP configuration in .env.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate OTP' });
  }
};

const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const cached = otpStore['admin_otp'];

  if (!cached || cached.code !== otp || Date.now() > cached.expiresAt) {
    return res.status(400).json({ success: false, message: 'Invalid or expired security code.' });
  }

  res.json({ success: true, message: 'Identity verified. You may now update your profile.' });
};

const updateCredentials = async (req, res) => {
  const { newUsername, newPassword, newName, otp } = req.body;

  // Security Check: Only allow bypass for non-sensitive data
  const isSensitiveChange = newUsername || newPassword;
  const isBypass = otp === 'BYPASS_CHECK';

  if (isSensitiveChange || !isBypass) {
    if (!otp) {
      return res.status(400).json({ message: 'Security OTP is required for this action' });
    }

    const cached = otpStore['admin_otp'];
    if (!cached || cached.code !== otp || Date.now() > cached.expiresAt) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  }

  try {
    const updateData = {};
    
    // Only update username/password if provided AND OTP was verified
    if (newUsername && (otp !== 'BYPASS_CHECK')) updateData.username = newUsername;
    if (newPassword && (otp !== 'BYPASS_CHECK')) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }
    
    if (newName) updateData.name = newName;
    if (req.body.newResumeUrl) updateData.resumeUrl = req.body.newResumeUrl;
    if (req.body.bio) updateData.bio = req.body.bio;
    if (req.body.profileImage) updateData.profileImage = req.body.profileImage;
    if (req.body.github) updateData.github = req.body.github;
    if (req.body.linkedin) updateData.linkedin = req.body.linkedin;
    if (req.body.twitter) updateData.twitter = req.body.twitter;
    if (req.body.instagram) updateData.instagram = req.body.instagram;

    await User.findOneAndUpdate({}, updateData);

    // Clear OTP after sensitive use
    if (!isBypass) delete otpStore['admin_otp'];

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error(`Update error: ${error.message}`);
    res.status(500).json({ message: 'Server error during update' });
  }
};

const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({}).select('name resumeUrl bio profileImage github linkedin twitter instagram');
    res.json(user);
  } catch (error) {
    console.error(`[PUBLIC PROFILE ERROR] ${error.message}`);
    res.status(500).json({ message: `Public Access Restricted: ${error.message}` });
  }
};

module.exports = { login, getMe, requestOTP, verifyOTP, updateCredentials, getPublicProfile };
