const ResumeDownload = require('../models/ResumeDownload');

const trackDownload = async (req, res) => {
  try {
    let counter = await ResumeDownload.findOne();
    if (!counter) {
      counter = await ResumeDownload.create({ downloadCount: 1 });
    } else {
      counter.downloadCount += 1;
      await counter.save();
    }
    res.json({ success: true, downloadCount: counter.downloadCount });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getDownloads = async (req, res) => {
  try {
    const counter = await ResumeDownload.findOne();
    res.json({ downloadCount: counter ? counter.downloadCount : 0 });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { trackDownload, getDownloads };
