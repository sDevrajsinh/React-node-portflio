const jwt = require('jsonwebtoken');

/**
 * Generate a short‑lived access token (default 15 minutes).
 * @param {string} id - User ID to embed in the token.
 * @returns {string} JWT access token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

module.exports = generateToken;
