const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'Solanki Devrajsinh'
  },
  resumeUrl: {
    type: String,
    default: 'https://drive.google.com/file/d/1mHGBi9JIEqNIgLPf0Q5jpAi6AJKLl11L/view?usp=sharing'
  },
  bio: {
    type: String,
    default: "I am Devraj Solanki, a passionate Full Stack Web Developer currently learning at Red & White Skill Education. I have hands-on experience in both frontend and backend technologies. I enjoy building responsive, user-friendly, and scalable web applications. I am always eager to learn new technologies and improve my development skills."
  },
  profileImage: {
    type: String,
    default: ''
  },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  instagram: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
