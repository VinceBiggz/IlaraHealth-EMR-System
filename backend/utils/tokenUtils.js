// tokenUtils.js
const jwt = require('jsonwebtoken');
const pool = require('../db/db'); // Make sure to adjust the path if necessary

async function generateToken(username, role) {

    const token = jwt.sign({ username, role }, process.env.JWT_SECRET);
    return token;

}

module.exports = { generateToken };
