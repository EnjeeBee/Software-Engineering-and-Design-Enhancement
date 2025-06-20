// Middleware to authenticate incoming requests using JWT
// This ensures that only logged-in users can access protected endpoints
// Import jsonwebtoken to verify tokens
const jwt = require('jsonwebtoken');

// Define middleware function for token validation
function authenticateToken(req, res, next) {
// Get the Authorization header and extract the token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
// If no token is found, respond with 401 Unauthorized
  if (!token) return res.sendStatus(401);
// Verify the token using the secret key from .env
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
// Attach decoded user data to the request object
    req.user = user;
    next();
  });
}

// Export the middleware function
module.exports = authenticateToken;