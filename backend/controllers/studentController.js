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

    studentModel.getAllStudents((err, results) => {

        if (err) {
             
            console.log("DATABASE ERROR:", err);
            
            return res.status(500).json({
                message: "Error fetching students"
            });

        }

        res.status(200).json(results);

    });

}

module.exports = {
    addStudent,
    getAllStudents
};