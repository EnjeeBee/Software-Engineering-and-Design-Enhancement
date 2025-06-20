// Import Express to create routes for authentication
const express = require('express');
// Create a new Express router for handling /register and /login
const router = express.Router();
// Import bcrypt to hash and compare passwords securely
const bcrypt = require('bcryptjs');
// Import JWT to generate authentication tokens
const jwt = require('jsonwebtoken');
// Import the User model to interact with the users collection in MongoDB
const User = require('../models/User');

// POST /register - Creates a new user account with hashed password
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /login - Authenticates user and returns JWT token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export the router so it can be mounted in index.js
module.exports = router;