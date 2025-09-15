const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Handles new user registration
const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 1. Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required.' });
    }

    // 2. Check if user already exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // 3. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    // 5. Send a success response
    res.status(201).json({ 
      message: 'User registered successfully!',
      user: newUser.rows[0]
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

module.exports = {
  registerUser,
};