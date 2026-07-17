const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");

router.post("/addStudent", studentController.addStudent);

router.get("/students", studentController.getAllStudents);

module.exports = router;