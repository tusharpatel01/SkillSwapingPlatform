import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './src/DB/indexDB.js'
dotenv.config();

// Connect to database
connectDB();

// Route files
import auth from './src/routes/auth.routes.js';
import users from './src/routes/user.routes.js';
import skills from './src/routes/skill.routes.js';
import chat from './src/routes/chat.routes.js';



const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/skills', skills);
app.use('/api/chat', chat);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});