// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Unauthorized: Token expired' });
      } else {
        return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
      }
    }

    req.user = decodedToken; // Attach decoded token data to the request object
    next(); // Proceed to the next middleware/route handler
  });
}

module.exports = authenticateToken;
