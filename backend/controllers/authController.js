const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

function register(req, res) {

    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        return res.status(400).json({
            message: "Username, password, and confirm password are required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match"
        });
    }

    userModel.findByUsername(username, (err, results) => {

        if (err) {
            console.log("DATABASE ERROR:", err);

            return res.status(500).json({
                message: "Error registering user"
            });
        }

        if (results.length > 0) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        bcrypt.hash(password, 10, (hashErr, passwordHash) => {

            if (hashErr) {
                console.log("BCRYPT ERROR:", hashErr);

                return res.status(500).json({
                    message: "Error registering user"
                });
            }

            userModel.createUser(username, passwordHash, (createErr) => {

                if (createErr) {
                    console.log("CREATE USER ERROR:", createErr);

                    return res.status(500).json({
                        message: "Error registering user"
                    });
                }

                res.status(201).json({
                    message: "Registration successful",
                    username,
                    role: "admin"
                });

            });

        });

    });

}

function login(req, res) {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    userModel.findByUsername(username, (err, results) => {

        if (err) {
            console.log("DATABASE ERROR:", err);

            return res.status(500).json({
                message: "Error logging in"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {

            if (err) {
                console.log("BCRYPT ERROR:", err);

                return res.status(500).json({
                    message: "Error logging in"
                });
            }

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid username or password"
                });
            }

            res.status(200).json({
                message: "Login successful",
                username: user.username,
                role: user.role || "admin"
            });

        });

    });

}

module.exports = {
    register,
    login
};
