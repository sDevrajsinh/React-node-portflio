const mongoose = require('mongoose');

const resumeDownloadSchema = new mongoose.Schema({
  downloadCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('ResumeDownload', resumeDownloadSchema);
