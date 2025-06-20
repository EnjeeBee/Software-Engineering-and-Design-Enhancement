// Import Express to create route handlers
const express = require('express');
// Create a new router object to define appointment-related routes
const router = express.Router();
// Import the Mongoose model for appointments
const Appointment = require('../models/Appointment');
// Import JWT middleware to protect routes requiring authentication
const authenticateToken = require('../middleware/auth');

// GET /api/appointments - Public route to retrieve all appointments
router.get('/', async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// POST /api/appointments - Protected route to create a new appointment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export the router to be used in other parts of the application
module.exports = router;