require("dotenv").config();

const mysql = require("mysql2");

const dbName = process.env.DB_NAME || "student_db";

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || ""
});

let resolveDatabaseReady;
let rejectDatabaseReady;

const databaseReady = new Promise((resolve, reject) => {
    resolveDatabaseReady = resolve;
    rejectDatabaseReady = reject;
});

function initializeDatabase() {
    const createUsersTableSql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) NOT NULL DEFAULT 'admin'
        )
    `;

    const createStudentsTableSql = `
        CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            course VARCHAR(100) NOT NULL,
            age INT NOT NULL,
            student_number VARCHAR(50),
            date_of_birth DATE,
            gender VARCHAR(20),
            address VARCHAR(255),
            guardian_name VARCHAR(100),
            guardian_phone VARCHAR(20),
            admission_date DATE,
            status VARCHAR(20) NOT NULL DEFAULT 'Active'
        )
    `;

    const addStudentFieldsSql = `
        ALTER TABLE students
        ADD COLUMN IF NOT EXISTS student_number VARCHAR(50),
        ADD COLUMN IF NOT EXISTS date_of_birth DATE,
        ADD COLUMN IF NOT EXISTS gender VARCHAR(20),
        ADD COLUMN IF NOT EXISTS address VARCHAR(255),
        ADD COLUMN IF NOT EXISTS guardian_name VARCHAR(100),
        ADD COLUMN IF NOT EXISTS guardian_phone VARCHAR(20),
        ADD COLUMN IF NOT EXISTS admission_date DATE,
        ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'Active'
    `;

    const addUserFieldsSql = `
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'admin'
    `;

    const createAttendanceTableSql = `
        CREATE TABLE IF NOT EXISTS attendance (
            id INT AUTO_INCREMENT PRIMARY KEY,
            student_id INT NOT NULL,
            attendance_date DATE NOT NULL,
            status VARCHAR(20) NOT NULL,
            note VARCHAR(255),
            UNIQUE KEY unique_student_date (student_id, attendance_date),
            FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
        )
    `;

    const createMarksTableSql = `
        CREATE TABLE IF NOT EXISTS marks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            student_id INT NOT NULL,
            subject VARCHAR(100) NOT NULL,
            assessment VARCHAR(50) NOT NULL,
            score DECIMAL(6,2) NOT NULL,
            max_score DECIMAL(6,2) NOT NULL DEFAULT 100,
            term VARCHAR(50) NOT NULL,
            recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
        )
    `;

    const seedAdminSql = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE username = username
    `;

    connection.query(createUsersTableSql, (err) => {
        if (err) {
            console.error("Failed to create users table");
            console.error(err);
            rejectDatabaseReady(err);
            return;
        }

        connection.query(addUserFieldsSql, (userFieldsErr) => {
            if (userFieldsErr) {
                console.error("Failed to update users table");
                console.error(userFieldsErr);
                rejectDatabaseReady(userFieldsErr);
                return;
            }

            connection.query(createStudentsTableSql, (err2) => {
            if (err2) {
                console.error("Failed to create students table");
                console.error(err2);
                rejectDatabaseReady(err2);
                return;
            }

            connection.query(addStudentFieldsSql, (studentFieldsErr) => {
                if (studentFieldsErr) {
                    console.error("Failed to update students table");
                    console.error(studentFieldsErr);
                    rejectDatabaseReady(studentFieldsErr);
                    return;
                }

                connection.query(createAttendanceTableSql, (attendanceErr) => {
                    if (attendanceErr) {
                        console.error("Failed to create attendance table");
                        console.error(attendanceErr);
                        rejectDatabaseReady(attendanceErr);
                        return;
                    }

                    connection.query(createMarksTableSql, (marksErr) => {
                        if (marksErr) {
                            console.error("Failed to create marks table");
                            console.error(marksErr);
                            rejectDatabaseReady(marksErr);
                            return;
                        }

            connection.query(seedAdminSql, ["admin", "$2a$10$h04QIulj4HpJ2/evwj1mXO6II1BmWBqT3gqnwJY01L.iP2UPimiAi"], (seedErr) => {
                if (seedErr) {
                    console.error("Failed to seed admin user");
                    console.error(seedErr);
                    rejectDatabaseReady(seedErr);
                    return;
                }

                console.log("Database initialized successfully");
                resolveDatabaseReady();
            });
                    });
                });
            });
        });
        });
    });
}

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.error(err);
        rejectDatabaseReady(err);
        return;
    }

    connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (dbErr) => {
        if (dbErr) {
            console.error("Failed to create database");
            console.error(dbErr);
            rejectDatabaseReady(dbErr);
            return;
        }

        connection.changeUser({ database: dbName }, (changeErr) => {
            if (changeErr) {
                console.error("Failed to select database");
                console.error(changeErr);
                rejectDatabaseReady(changeErr);
                return;
            }

            console.log("Database Connected Successfully");
            initializeDatabase();
        });
    });
});

module.exports = connection;
module.exports.databaseReady = databaseReady;
