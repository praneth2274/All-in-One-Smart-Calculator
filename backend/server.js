const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Security Header Configuration
app.use(helmet({ contentSecurityPolicy: false }));

// CORS Setup
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// Connect DB
connectDB();

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/calculators', require('./routes/calculatorRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({
    project: 'CalcHub AI - All-in-One Smart Calculator Suite',
    status: 'API Service Running Smoothly',
    version: '1.0.0',
    calculatorsAvailable: 50,
  });
});

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[CalcHub AI Backend] Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
});
