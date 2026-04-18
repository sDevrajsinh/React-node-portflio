require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedAdmin = async () => {
  try {
    await connectDB();

    // Clear existing users to ensure only one admin with the new credentials
    await User.deleteMany({});
    console.log('Existing users cleared.');

    const username = process.env.ADMIN_USERNAME || 'admin';
    const rawPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const admin = new User({
      username: username,
      password: hashedPassword,
      name: 'Solanki Devrajsinh'
    });

    await admin.save();
    console.log(`Admin user created successfully! Username: ${username}, Password: ${rawPassword}, Name: Solanki Devrajsinh`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
