const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  techDisplay: { type: String },
  description: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String },
  liveLink: { type: String },
  sourceLink: { type: String },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
