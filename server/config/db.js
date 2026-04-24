const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false); // Prepare for Mongoose 7
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000, // Fail fast if IP is blocked, but give it 15s for Render cold starts
      socketTimeoutMS: 45000, // Close sockets after 45s
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
