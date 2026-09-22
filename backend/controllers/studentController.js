const studentModel = require("../models/studentModel");

function addStudent(req, res) {

    const student = req.body;

    studentModel.addStudent(student, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Error adding student"
            });
        }

        res.status(201).json({
            message: "Student added successfully"
        });

    });
}

function getAllStudents(req, res) {

    studentModel.getAllStudents(req.query, (err, results) => {

        if (err) {
             
            console.log("DATABASE ERROR:", err);
            
            return res.status(500).json({
                message: "Error fetching students"
            });

        }

        res.status(200).json(results);

    });

}

function updateStudent(req, res) {

    studentModel.updateStudent(req.params.id, req.body, (err, result) => {
        if (err) {
            console.log("DATABASE ERROR:", err);
            return res.status(500).json({ message: "Error updating student" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully" });
    });
}

function getStats(req, res) {

    studentModel.getStats((err, results) => {
        if (err) {
            console.log("DATABASE ERROR:", err);
            return res.status(500).json({ message: "Error fetching dashboard statistics" });
        }

        res.status(200).json(results[0]);
    });
}

function deleteStudent(req, res) {

    const { id } = req.params;

    studentModel.deleteStudent(id, (err, result) => {

        if (err) {
            console.log("DATABASE ERROR:", err);

            return res.status(500).json({
                message: "Error deleting student"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });

    });
}

module.exports = {
    addStudent,
    getAllStudents,
    updateStudent,
    getStats,
    deleteStudent
};