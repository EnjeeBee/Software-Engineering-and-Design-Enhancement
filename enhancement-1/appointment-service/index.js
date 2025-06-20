// Import Express.js, a web framework for building APIs
const express = require('express');
// Import Mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Import Morgan for HTTP request logging
const morgan = require('morgan');
// Import CORS to allow cross-origin requests
const cors = require('cors');
// Import dotenv to load environment variables from a .env file
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');
// Import the appointment route handlers
const appointmentRoutes = require('./routes/appointments');

// Load environment variables from .env file
dotenv.config();
// Initialize the Express application
const app = express();

// Enable CORS for all routes
app.use(cors());
// Enable JSON body parsing for incoming requests
app.use(express.json());
// Use Morgan to log incoming requests to the console
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Mount the appointment routes under /api/appointments
app.use('/api/appointments', appointmentRoutes);

// Connect to the MongoDB database using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the port number for the server to listen on
const PORT = process.env.PORT || 5001;
// Start the Express server and listen on the defined port
app.listen(PORT, () => console.log(`Appointment Service running on port ${PORT}`));