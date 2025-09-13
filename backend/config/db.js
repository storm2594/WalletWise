const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool instance using the connection URL from our .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('🐘 Connected to the PostgreSQL database successfully!');
  client.release();
});

module.exports = pool;