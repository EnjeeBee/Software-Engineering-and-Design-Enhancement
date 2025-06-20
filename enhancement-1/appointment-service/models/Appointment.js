// This file defines the Mongoose schema for an appointment
// Each appointment includes a date, time, description, and a confirmed status
// Import Mongoose to define the schema
const mongoose = require('mongoose');

// Define the schema structure and field types
const AppointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  description: String,
  confirmed: Boolean
});

// Export the schema as a model to be used in the app
module.exports = mongoose.model('Appointment', AppointmentSchema);