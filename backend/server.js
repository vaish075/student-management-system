const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

// Import database connection and wait for schema initialization.
const database = require("./database");

// Import routes
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const academicRoutes = require("./routes/academicRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Serve the frontend (frontend/, css/, js/ all live at the project root,
// and frontend/*.html reference them with relative paths like ../css/style.css)
const projectRoot = path.join(__dirname, "..");
app.use(express.static(projectRoot));

// Routes
app.use(authRoutes);
app.use(studentRoutes);
app.use(academicRoutes);

// Root route redirects to the login page
app.get("/", (req, res) => {
    res.redirect("/frontend/login.html");
});

// Start Server
const PORT = process.env.PORT || 3000;

database.databaseReady
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(() => {
        console.error("Server could not start because the database was not initialized.");
        process.exitCode = 1;
    });
