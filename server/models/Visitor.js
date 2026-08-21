const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  deviceType: {
    type: String
  },
  browserInfo: {
    type: String
  },
  ip: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
