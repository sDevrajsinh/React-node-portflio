const mongoose = require('mongoose');

// ------------------------------------------------------------
// Connection helpers with robust retry & exponential back‑off
// ------------------------------------------------------------

const MAX_RETRIES = parseInt(process.env.MONGO_MAX_RETRIES) || 5;
const RETRY_DELAY_MS = 3000; // 3 s base, will double each attempt
let retryCount = 0;

/**
 * Generic connection function used by both read‑only and admin helpers.
 * @param {string} uri - MongoDB connection string.
 */
const _connect = async (uri) => {
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    console.log(`[DATABASE] ✅ Connected to ${conn.connection.host}`);
    retryCount = 0; // reset after success
    return conn;
  } catch (err) {
    console.error(`[DATABASE] ❌ Connection error: ${err.message}`);
    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY_MS * Math.pow(2, retryCount);
      console.warn(`[DATABASE] ⏳ Retrying (${retryCount + 1}/${MAX_RETRIES}) in ${delay / 1000}s…`);
      retryCount += 1;
      setTimeout(() => _connect(uri), delay);
    } else {
      console.error('[DATABASE] 🚨 Max retries reached – exiting.');
      process.exit(1);
    }
  }
};

/** Read‑only connection – used by the application for all standard routes */
const connectReadOnlyDB = async () => {
  const uri = process.env.MONGO_URI_READONLY || process.env.MONGO_URI;
  return _connect(uri);
};

/** Admin connection – used only for seeding/admin‑only operations */
const connectAdminDB = async () => {
  const uri = process.env.MONGO_URI_ADMIN;
  if (!uri) {
    throw new Error('MONGO_URI_ADMIN is not defined in .env');
  }
  return _connect(uri);
};

// ------------------------------------------------------------
// Global event listeners (informative only)
// ------------------------------------------------------------
mongoose.connection.on('connected', () => console.log('[DATABASE] 🔗 Connection established.'));
mongoose.connection.on('error', (err) => console.error(`[DATABASE] ⚡️ Runtime error: ${err.message}`));
mongoose.connection.on('disconnected', () => console.warn('[DATABASE] ❗️ Disconnected – will attempt auto‑reconnect.'));
mongoose.connection.on('reconnected', () => console.log('[DATABASE] 🔄 Reconnected successfully.'));

module.exports = { connectReadOnlyDB, connectAdminDB };
