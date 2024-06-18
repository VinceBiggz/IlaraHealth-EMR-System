const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const authenticateToken = require("../middleware/authMiddleware"); // Make sure to adjust the path if necessary

// Get all users (admin only)
router.get("/", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const users = await pool.query("SELECT user_id, username, role FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get a specific user (admin only)
router.get("/:id", authenticateToken, async (req, res) => {
  // ... (similar to get all users, but with additional check for user ID)
});

// Update a user (admin only)
router.put("/:id", authenticateToken, async (req, res) => {
  // ... (implement update logic)
});

// Delete a user (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  // ... (implement delete logic)
});

module.exports = router;
