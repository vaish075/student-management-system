const academicModel = require("../models/academicModel");

function addAttendance(req, res) {
    const record = req.body;

    if (!record.studentId || !record.date || !record.status) {
        return res.status(400).json({ message: "Student, date, and status are required" });
    }

    academicModel.addAttendance(record, (err) => {
        if (err) {
            console.log("DATABASE ERROR:", err);
            return res.status(500).json({ message: "Error saving attendance" });
        }

        res.status(201).json({ message: "Attendance saved successfully" });
    });
}

function getAttendance(req, res) {
    academicModel.getAttendance(req.params.studentId, (err, results) => {
        if (err) {
            console.log("DATABASE ERROR:", err);
            return res.status(500).json({ message: "Error fetching attendance" });
        }

        res.status(200).json(results);
    });
}

function addMark(req, res) {
    const record = req.body;

    if (!record.studentId || !record.subject || !record.assessment || record.score === undefined || !record.term) {
        return res.status(400).json({ message: "Student, subject, assessment, score, and term are required" });
    }

    academicModel.addMark(record, (err) => {
        if (err) {
            console.log("DATABASE ERROR:", err);
            return res.status(500).json({ message: "Error saving marks" });
        }

        res.status(201).json({ message: "Marks saved successfully" });
    });
}

function getMarks(req, res) {
    academicModel.getMarks(req.params.studentId, (err, results) => {
        if (err) {
            console.log("DATABASE ERROR:", err);
            return res.status(500).json({ message: "Error fetching marks" });
        }

        res.status(200).json(results);
    });
}

module.exports = {
    addAttendance,
    getAttendance,
    addMark,
    getMarks
};
