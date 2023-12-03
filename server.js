import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Security middleware
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

import connectDB from './config/db.js';

import errorHandler from './middleware/errorHandler.js';

import shoes from './routes/shoeRoutes.js';
import auth from './routes/authRoutes.js';

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS (Cross-Site Scripting) attacks
/*
  It is a type of web security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.
*/
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Enable CORS (Cross-Origin Resource Sharing)
/*
  CORS is a web security mechanism that allows web applications to access resources hosted on other domains while protecting against unauthorized access and web-based attacks.
*/
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100
});
app.use(limiter);

// Set security HTTP headers
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Shoes API'
  });
});

app.use('/api/v1/shoes', shoes);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});