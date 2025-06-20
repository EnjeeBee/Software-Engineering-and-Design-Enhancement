// Import Express to build the web server
const express = require('express');
// Import Mongoose for connecting to MongoDB
const mongoose = require('mongoose');
// Import Morgan for logging HTTP requests
const morgan = require('morgan');
// Import CORS to allow requests from different origins
const cors = require('cors');
// Import dotenv to manage environment variables from .env file
const dotenv = require('dotenv');
// Import authentication routes for registration and login
const authRoutes = require('./routes/auth');

// Load environment variables from the .env file
dotenv.config();
// Initialize the Express app
const app = express();

// Enable CORS for all incoming requests
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());
// Log requests using Morgan
app.use(morgan('dev'));
// Mount authentication route handlers at /api/auth
app.use('/api/auth', authRoutes);

// Connect to MongoDB using connection string from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Set the server port
const PORT = process.env.PORT || 5000;
// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));