const connection = require("../database");


// Add Student
function addStudent(student, callback) {

    const sql = `
    INSERT INTO students(name,email,phone,course,age)
    VALUES(?,?,?,?,?)
    `;

    const values = [
        student.name,
        student.email,
        student.phone,
        student.course,
        student.age
    ];

    connection.query(sql, values, callback);

}


// Get All Students
function getAllStudents(callback) {

    const sql = "SELECT * FROM students";

    connection.query(sql, callback);

}


module.exports = {
    addStudent,
    getAllStudents
};