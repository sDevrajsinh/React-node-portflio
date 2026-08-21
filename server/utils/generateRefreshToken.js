const jwt = require('jsonwebtoken');

/**
 * Generate a long‑lived refresh token (default 30 days).
 * @param {string} id - User ID to embed in the token.
 * @returns {string} JWT refresh token
 */
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = generateRefreshToken;
