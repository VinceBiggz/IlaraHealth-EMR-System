const pool = require('./db'); // Assuming db.js is in the same directory

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Connected to database successfully!");
    client.release();
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
}

testConnection();
