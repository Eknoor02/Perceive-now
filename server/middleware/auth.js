const jwt = require('jsonwebtoken');

// Hardcoded tokens for demonstration 
// In a real app, these would be securely generated and stored.
const HARDCODED_VIEWER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.viewer_token'; // Represents a viewer role
const HARDCODED_REVIEWER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.reviewer_token'; // Represents a reviewer role

// Mimic JWT verification. In a real app, you'd have a secret key.
const verifyToken = (token) => {
  try {
    // For this stub, we just check against hardcoded values
    if (token === HARDCODED_VIEWER_TOKEN) {
      return { userId: 'user123', role: 'viewer' }; // 
    }
    if (token === HARDCODED_REVIEWER_TOKEN) {
      return { userId: 'admin456', role: 'reviewer' }; // 
    }
    return null; // Invalid token
  } catch (error) {
    return null; // Token verification failed
  }
};

const authenticateToken = (allowedRoles = []) => (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided.' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: 'Access Denied: Invalid or expired token.' });
  }

  // Check if the user's role is allowed for this route 
  if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
    return res.status(403).json({ message: 'Access Denied: Insufficient permissions.' });
  }

  req.user = decoded; // Attach user info to request
  next();
};

module.exports = {
  authenticateToken,
  HARDCODED_VIEWER_TOKEN,
  HARDCODED_REVIEWER_TOKEN
};