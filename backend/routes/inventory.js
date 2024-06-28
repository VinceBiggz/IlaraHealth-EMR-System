// backend/routes/inventory.js
const express = require("express");
const router = express.Router();
const pool = require("../db/db"); // Correct path
const authenticateToken = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  // Configure your email service (e.g., Gmail, SendGrid, etc.)
  service: "Gmail", // Replace with your email provider
  auth: {
    user: "youremail@gmail.com", // Replace with your email
    pass: "yourpassword", // Replace with your password
  },
});

// GET /api/inventory - Get all inventory items
router.get("/", authenticateToken, async (req, res) => {
  try {
    const allInventory = await pool.query("SELECT * FROM inventory");
    const inventory = allInventory.rows;

    if (inventory.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "Inventory data not found" });
    } else {
      res.json({ success: true, data: inventory });
    }
  } catch (err) {
    console.error("Error fetching inventory data:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id, 10); // Parse id to an integer (base 10)

  // Input validation: Check if the ID is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid item ID" });
  }

  try {
    const itemResult = await pool.query(
      "SELECT * FROM inventory WHERE item_id=$1",
      [id]
    );
    const item = itemResult.rows[0];

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory item not found" });
    }

    res.json({ success: true, data: item });
  } catch (err) {
    console.error("Error fetching inventory item:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/inventory/:id - Get a specific inventory item
router.get("/:id", authenticateToken, async (req, res) => {
  const itemId = parseInt(req.params.id);
  try {
    const item = await pool.query(
      "SELECT * FROM inventory WHERE item_id=$1",
      [itemId]
    );
    if (item.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// POST /api/inventory - Create a new inventory item (admin only)
router.post(
  "/",
  authenticateToken,
  body("name").notEmpty().withMessage("Name is required"),
  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive integer or zero"),
  body("low_stock_threshold")
    .isInt({ min: 0 })
    .withMessage("Low stock threshold must be a positive integer or zero"),
  async (req, res) => {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden - Only admins can create items" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, quantity, low_stock_threshold } = req.body;

    try {
      const newItem = await pool.query(
        "INSERT INTO inventory (name, quantity, low_stock_threshold) VALUES ($1, $2, $3) RETURNING *",
        [name, quantity, low_stock_threshold]
      );

      res.status(201).json(newItem.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

// PUT /api/inventory/:id - Update an inventory item (admin only)
router.put(
  "/:id",
  authenticateToken,
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive integer or zero"),
  body("low_stock_threshold")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Low stock threshold must be a positive integer or zero"),
  async (req, res) => {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden - Only admins can update items" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const itemId = parseInt(req.params.id);
    const { name, quantity, low_stock_threshold } = req.body;

    try {
      const updatedItem = await pool.query(
        `UPDATE inventory SET name = COALESCE($1, name), quantity = COALESCE($2, quantity), low_stock_threshold = COALESCE($3, low_stock_threshold)
         WHERE item_id = $4 RETURNING *`,
        [name, quantity, low_stock_threshold, itemId]
      );

      if (updatedItem.rows.length === 0) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.json(updatedItem.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

// DELETE /api/inventory/:id - Delete an inventory item (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Forbidden - Only admins can delete items" });
  }

  const itemId = parseInt(req.params.id);

  try {
    const deletedItem = await pool.query(
      "DELETE FROM inventory WHERE item_id = $1 RETURNING *",
      [itemId]
    );
    if (deletedItem.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(deletedItem.rows[0]); // Return the deleted item
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// POST /api/inventory/checkout - Checkout an item
router.post(
  "/checkout",
  authenticateToken,
  body("itemId").isInt().withMessage("itemId is required"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { itemId, quantity } = req.body;

    try {
      // Begin transaction
      await pool.query("BEGIN");

      // Get current item quantity
      const getItemResult = await pool.query(
        "SELECT * FROM inventory WHERE item_id = $1",
        [itemId]
      );
      const item = getItemResult.rows[0];

      if (!item) {
        await pool.query("ROLLBACK");
        return res.status(404).json({ error: "Item not found" });
      }

      const newQuantity = item.quantity - quantity;
      if (newQuantity < 0) {
        await pool.query("ROLLBACK");
        return res.status(400).json({ error: "Not enough stock" });
      }

      // Update inventory
      await pool.query(
        "UPDATE inventory SET quantity = $1 WHERE item_id = $2",
        [newQuantity, itemId]
      );

      // Check if low stock threshold is reached
      if (newQuantity <= item.low_stock_threshold) {
        const mailOptions = {
          from: "your_email@gmail.com", // Replace with your email
          to: "admin_email@example.com", // Replace with admin's email
          subject: "Low Stock Alert",
          text: `Item "${item.name}" is running low on stock. Current quantity: ${newQuantity}`,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log("Low stock email sent successfully!");
        } catch (error) {
          console.error("Error sending low stock email:", error);
          // Handle the error (e.g., log it, retry later, etc.)
        }
      }

      // Commit transaction
      await pool.query("COMMIT");
      res.json({ message: "Checkout successful" });
    } catch (err) {
      await pool.query("ROLLBACK");
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

module.exports = router;
