const connection = require("../database");

// Find a user by username (used during login)
function findByUsername(username, callback) {

    const sql = "SELECT * FROM users WHERE username = ?";

    connection.query(sql, [username], callback);

}

// Create a new user (used during registration)
function createUser(username, passwordHash, callback) {

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

    connection.query(sql, [username, passwordHash], callback);

}

module.exports = {
    findByUsername,
    createUser
};
