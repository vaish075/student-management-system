const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");

router.post("/addStudent", studentController.addStudent);

router.get("/students", studentController.getAllStudents);

router.put("/students/:id", studentController.updateStudent);

router.get("/dashboard/stats", studentController.getStats);

router.delete("/students/:id", studentController.deleteStudent);

module.exports = router;