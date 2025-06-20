// Middleware to validate JWT tokens on protected routes
// Ensures that requests come from authenticated users
// Import jsonwebtoken to decode and verify JWTs
const jwt = require('jsonwebtoken');

// Define the authentication middleware function
function authenticateToken(req, res, next) {
// Retrieve token from the Authorization header (format: Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

// If no token is provided, return 401 Unauthorized
  if (!token) return res.sendStatus(401);

// Verify token with the secret key and extract user info
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
// Attach the user data to the request for downstream handlers
    req.user = user;
    next();
  });
}

// Export the middleware to use in route protection
module.exports = authenticateToken;