// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto'); // For SHA1 hashing
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const { body, validationResult } = require('express-validator');

// REGISTER
router.post(
    '/register',
    body('username').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password, role } = req.body;

        try {
            const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
            const newUser = await pool.query(
                'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
                [username, hashedPassword, role]
            );
            
            const token = jwt.sign({ userId: newUser.rows[0].user_id }, process.env.JWT_SECRET);

            res.json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
);

// LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Hash the Password Using SHA1
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

        // 2. Query the Database
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = userResult.rows[0]; // Get the first (and hopefully only) matching user

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 3. Compare Hashed Passwords
        if (hashedPassword !== user.password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 4. Generate JWT Token
        const tokenPayload = { userId: user.user_id, role: user.role }; // Include role in token payload
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

        // 5. Send Success Response with Token
        res.json({ success: true, token }); 

    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;