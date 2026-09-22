const connection = require("../database");

function addAttendance(record, callback) {
    const sql = `
        INSERT INTO attendance (student_id, attendance_date, status, note)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status = VALUES(status), note = VALUES(note)
    `;
    connection.query(sql, [record.studentId, record.date, record.status, record.note || null], callback);
}

function getAttendance(studentId, callback) {
    const sql = `
        SELECT attendance.*, students.name
        FROM attendance
        JOIN students ON students.id = attendance.student_id
        WHERE attendance.student_id = ?
        ORDER BY attendance.attendance_date DESC
    `;
    connection.query(sql, [studentId], callback);
}

function addMark(record, callback) {
    const sql = `
        INSERT INTO marks (student_id, subject, assessment, score, max_score, term)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    connection.query(sql, [
        record.studentId,
        record.subject,
        record.assessment,
        record.score,
        record.maxScore || 100,
        record.term
    ], callback);
}

function getMarks(studentId, callback) {
    const sql = `
        SELECT marks.*, students.name
        FROM marks
        JOIN students ON students.id = marks.student_id
        WHERE marks.student_id = ?
        ORDER BY marks.recorded_at DESC
    `;
    connection.query(sql, [studentId], callback);
}

module.exports = {
    addAttendance,
    getAttendance,
    addMark,
    getMarks
};
