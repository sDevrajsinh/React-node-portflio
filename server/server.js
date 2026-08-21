require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectReadOnlyDB } = require('./config/db');
const mongoose = require('mongoose'); // added for buffering config
const fs = require('fs');

// New constant to detect environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

// Disable Mongoose buffering so queries fail fast if DB not ready
mongoose.set('bufferCommands', false);

// Async IIFE to ensure DB connection before server starts
(async () => {
  try {
    // 1️⃣ Wait for DB connection
    await connectReadOnlyDB();
    console.log('✅ DB connection ready – starting server...');

    const app = express();

    // Trust proxy for Render's load balancer (important for tracking IP addresses)
    app.set('trust proxy', 1);

    // Rate Limiting Security
    const rateLimit = require('express-rate-limit');

    const generalLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 300, // Limit each IP to 300 requests per window
      standardHeaders: true,
      legacyHeaders: false,
      message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
    });

    const authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // Max 10 login attempts per 15 min window
      standardHeaders: true,
      legacyHeaders: false,
      message: { message: 'Too many login attempts, account temporarily locked for 15 minutes' }
    });

    const contactLimiter = rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 15, // Max 15 messages per hour per IP
      standardHeaders: true,
      legacyHeaders: false,
      message: { message: 'Too many messages sent. Please wait before submitting again.' }
    });

    // Middleware
    app.use(express.json());
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());
    app.use(generalLimiter);

    const corsOptions = {
      origin: [
        'http://localhost:3000',
        'https://react-node-portflio.onrender.com', // Render Backend Origin
        'https://react-node-portflio.vercel.app', // Vercel Frontend
        process.env.FRONTEND_URL
      ].filter(Boolean),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    };
    app.use(cors(corsOptions));

    // Configure Helmet to solve net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin
    app.use(helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    }));

    app.use(morgan('dev'));

    // API Routes
    app.use('/api/auth/login', authLimiter);
    app.use('/api/auth', authRoutes);
    app.use('/api/projects', projectRoutes);
    app.use('/api/settings', settingsRoutes);
    app.use('/api/contact', contactLimiter, contactRoutes);
    app.use('/api/visit', analyticsRoutes);
    app.use('/api/analytics', analyticsRoutes);
    app.get('/api/debug-user', require('./middleware/authMiddleware').protect, (req, res) => {
      res.json({
        hasUser: !!req.user,
        role: req.user ? req.user.role : null,
        roleType: req.user ? typeof req.user.role : null,
        userKeys: req.user ? Object.keys(req.user.toObject ? req.user.toObject() : req.user) : []
      });
    });
    app.use('/api/resume-download', resumeRoutes);
    app.use('/api/upload', uploadRoutes);
    app.use(errorHandler);

    // Serve static files from the uploads folder
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    // -------------------------- DEPLOYMENT SETUP --------------------------
    // Serve static files from the React build folder **only in production**
    if (NODE_ENV === 'production') {
      // Serve static assets
      app.use(express.static(path.join(__dirname, '../client/build')));

      // All other routes should return the React app's index.html
      app.get(/(.*)/, (req, res) => {
        const indexPath = path.resolve(__dirname, '..', 'client', 'build', 'index.html');
        res.sendFile(indexPath);
      });
    } else {
      // Development fallback – simple message indicating API server is alive
      app.get('/', (req, res) => {
        res.send('API server is running (development mode).');
      });
    }
    // ----------------------------------------------------------------------

    const PORT = process.env.PORT || 5000;

    // Simple health / ping endpoint for quick API test
    app.get('/api/ping', (req, res) => {
      res.json({ message: 'pong', env: NODE_ENV });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Available API endpoints:');
      console.log('- GET /api/ping');
      console.log('- Auth routes: /api/auth');
      console.log('- Project routes: /api/projects');
      console.log('- Contact routes: /api/contact');
      console.log('- Analytics routes: /api/visit, /api/analytics');
    });

    // Process‑level error handling
    process.on('uncaughtException', err => {
      console.error('[FATAL] Uncaught Exception:', err);
      process.exit(1);
    });
    process.on('unhandledRejection', reason => {
      console.error('[FATAL] Unhandled Rejection:', reason);
    });
  } catch (err) {
    console.error('[FATAL] Could not start server:', err.message);
    process.exit(1);
  }
})();
