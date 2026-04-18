const Visitor = require('../models/Visitor');
const Project = require('../models/Project');

const trackVisitor = async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const visitorData = { ...req.body, ip };
    const visitor = await Visitor.create(visitorData);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: 'Error tracking visitor' });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dailyVisitors = await Visitor.countDocuments({ date: { $gte: today } });

    const mostVisitedPages = await Visitor.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const recentVisitors = await Visitor.find().sort({ createdAt: -1 }).limit(50);

    res.json({
      totalVisitors,
      dailyVisitors,
      mostVisitedPages,
      recentVisitors
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { trackVisitor, getAnalytics };
