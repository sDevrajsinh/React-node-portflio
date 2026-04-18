const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if IP is blocked
    });
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DATABASE ERROR] Connection Failed: ${error.message}`);
    console.error(`[HELP] Please ensure your IP is whitelisted in MongoDB Atlas: https://www.mongodb.com/docs/atlas/security-whitelist/`);
    // Do NOT exit process. This keeps the server running so it can return 500 errors to the frontend 
    // instead of crashing nodemon in a loop.
  }
};

module.exports = connectDB;
