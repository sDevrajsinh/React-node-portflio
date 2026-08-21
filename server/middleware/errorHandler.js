// server/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}\n`, err.stack);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
};
