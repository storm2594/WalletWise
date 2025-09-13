// Import required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- NEW LINE TO ADD ---
// Import and initialize the database connection pool
const pool = require('./config/db');
// -----------------------

// Import routes
const authRoutes = require('./routes/auth.routes');

// Initialize the Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 3001;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) so our mobile app can talk to the server
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// --- API Routes ---
// A simple welcome route to test if the server is up
app.get('/api/v1', (req, res) => {
  res.status(200).json({ message: 'Welcome to the WalletWise API!' });
});

// Use the authentication routes
app.use('/api/v1/auth', authRoutes);


// --- Start the server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});