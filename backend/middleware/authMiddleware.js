const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'calchub_secret_jwt_key_2026_btech_project_major');

      // Try finding user in DB or construct mock user from payload
      try {
        const user = await User.findById(decoded.id).select('-password');
        if (user) {
          req.user = user;
        } else {
          req.user = { _id: decoded.id, name: decoded.name || 'User', email: decoded.email, role: decoded.role || 'user' };
        }
      } catch (err) {
        req.user = { _id: decoded.id, name: decoded.name || 'User', email: decoded.email, role: decoded.role || 'user' };
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
