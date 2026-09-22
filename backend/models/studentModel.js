const connection = require("../database");


// Add Student
function addStudent(student, callback) {

    const sql = `
    INSERT INTO students(
        name,email,phone,course,age,student_number,date_of_birth,gender,
        address,guardian_name,guardian_phone,admission_date,status
    ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
        student.name,
        student.email,
        student.phone,
        student.course,
        student.age,
        student.studentNumber || null,
        student.dateOfBirth || null,
        student.gender || null,
        student.address || null,
        student.guardianName || null,
        student.guardianPhone || null,
        student.admissionDate || null,
        student.status || "Active"
    ];

    connection.query(sql, values, callback);

}


// Get All Students
function getAllStudents(filters, callback) {

    let sql = "SELECT * FROM students WHERE 1 = 1";
    const values = [];

    if (filters.search) {
        sql += " AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR student_number LIKE ?)";
        const search = `%${filters.search}%`;
        values.push(search, search, search, search);
    }

    if (filters.course) {
        sql += " AND course = ?";
        values.push(filters.course);
    }

    if (filters.status) {
        sql += " AND status = ?";
        values.push(filters.status);
    }

    sql += " ORDER BY id DESC";

    connection.query(sql, values, callback);

}

function updateStudent(id, student, callback) {

    const sql = `
        UPDATE students SET
            name = ?, email = ?, phone = ?, course = ?, age = ?,
            student_number = ?, date_of_birth = ?, gender = ?, address = ?,
            guardian_name = ?, guardian_phone = ?, admission_date = ?, status = ?
        WHERE id = ?
    `;

    const values = [
        student.name,
        student.email,
        student.phone,
        student.course,
        student.age,
        student.studentNumber || null,
        student.dateOfBirth || null,
        student.gender || null,
        student.address || null,
        student.guardianName || null,
        student.guardianPhone || null,
        student.admissionDate || null,
        student.status || "Active",
        id
    ];

    connection.query(sql, values, callback);

}

function getStats(callback) {

    const sql = `
        SELECT
            (SELECT COUNT(*) FROM students) AS totalStudents,
            (SELECT COUNT(*) FROM students WHERE status = 'Active') AS activeStudents,
            (SELECT COUNT(DISTINCT course) FROM students) AS totalCourses,
            (SELECT COUNT(*) FROM attendance WHERE status = 'Present') AS presentCount,
            (SELECT COUNT(*) FROM attendance) AS attendanceCount
    `;

    connection.query(sql, callback);

}


// Delete Student
function deleteStudent(id, callback) {

    const sql = "DELETE FROM students WHERE id = ?";

    connection.query(sql, [id], callback);

}


module.exports = {
    addStudent,
    getAllStudents,
    updateStudent,
    getStats,
    deleteStudent
};