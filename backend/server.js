 const express = require("express");
const cors = require("cors");

const app = express();

// Import database connection
require("./database");

// Import routes
const studentRoutes = require("./routes/studentRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(studentRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Student Management System Server is Running");
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});