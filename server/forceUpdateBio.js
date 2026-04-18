require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const updateProfile = async () => {
  try {
    await connectDB();
    
    const bio = "I am Devraj Solanki, a passionate Full Stack Web Developer currently learning at Red & White Skill Education. I have hands-on experience in both frontend and backend technologies. I enjoy building responsive, user-friendly, and scalable web applications. I am always eager to learn new technologies and improve my development skills.";
    
    // Update the existing user (assuming there's only one or the main one)
    const result = await User.findOneAndUpdate({}, { bio }, { new: true, upsert: true });
    
    console.log('Profile Updated Successfully!');
    console.log('New Bio:', result.bio);
    
    process.exit();
  } catch (error) {
    console.error('Update Failed:', error);
    process.exit(1);
  }
};

updateProfile();
