const express = require('express');
const router = express.Router();

// Import the controller functions
const authController = require('../controllers/auth.controller');

// Define the registration route
// POST /api/v1/auth/register
router.post('/register', authController.registerUser);

// We will add the /login route here later

module.exports = router;