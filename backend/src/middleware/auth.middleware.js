// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
// Protect routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};