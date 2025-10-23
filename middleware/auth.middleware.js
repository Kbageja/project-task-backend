const jwt = require('jsonwebtoken');
const logger = require('../logger');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    console.log(req.cookies)

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authMiddleware;