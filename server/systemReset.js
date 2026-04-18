require('dotenv').config();
const mongoose = require('mongoose');
const Visitor = require('./models/Visitor');
const Project = require('./models/Project');
const connectDB = require('./config/db');

const cleanupData = async () => {
  try {
    await connectDB();
    
    console.log('--- SYSTEM RESET INITIATED ---');
    
    // 1. Delete all visitor logs
    const visitorDelete = await Visitor.deleteMany({});
    console.log(`Deleted ${visitorDelete.deletedCount} old visitor logs.`);
    
    // 2. Reset all project likes to 0
    const projectReset = await Project.updateMany({}, { $set: { likes: 0 } });
    console.log(`Reset likes for ${projectReset.modifiedCount} projects.`);
    
    console.log('--- RESET COMPLETE. SYSTEM STARTING FRESH ---');
    
    process.exit();
  } catch (error) {
    console.error('Reset Failed:', error);
    process.exit(1);
  }
};

cleanupData();
