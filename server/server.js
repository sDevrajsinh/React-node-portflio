require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

// Connect to database
connectDB();

const app = express();

// Trust proxy for Render's load balancer (important for tracking IP addresses)
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(cors());

// Configure Helmet to solve net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false, // Disabling CSP for simplicity; enable and configure for production if needed
}));

app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', analyticsRoutes); 
app.use('/api/resume-download', resumeRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// -------------------------- DEPLOYMENT SETUP --------------------------
// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('(.*)', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});
// ----------------------------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Trigger restart for new MongoDB Atlas connection
