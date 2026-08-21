const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  maintenanceMode: { type: Boolean, default: false },
  publicApi: { type: Boolean, default: true },
  emailNotifications: { type: Boolean, default: true },
  neonAccents: { type: Boolean, default: true },
  seoTitle: { type: String, default: "Devraj Solanki | Full Stack Developer" },
  seoDesc: { type: String, default: "Professional portfolio of Devraj Solanki, Full Stack Web Developer." }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
