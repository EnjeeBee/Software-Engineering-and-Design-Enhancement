// This file defines the Mongoose schema for a User
// It includes fields for username and hashed password
// Import Mongoose to define the schema
const mongoose = require('mongoose');

// Define schema structure with validation
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Export the User model to be used in routes
module.exports = mongoose.model('User', UserSchema);