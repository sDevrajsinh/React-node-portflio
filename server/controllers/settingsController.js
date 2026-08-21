const Settings = require('../models/Settings');

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
};

const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    
    // Update fields
    const allowedFields = ['maintenanceMode', 'publicApi', 'emailNotifications', 'neonAccents', 'seoTitle', 'seoDesc'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings' });
  }
};

module.exports = { getSettings, updateSettings };
