const express = require("express");

const router = express.Router();
const academicController = require("../controllers/academicController");

router.post("/attendance", academicController.addAttendance);
router.get("/attendance/:studentId", academicController.getAttendance);
router.post("/marks", academicController.addMark);
router.get("/marks/:studentId", academicController.getMarks);

module.exports = router;
