-- Student Management System schema
-- Run with: mysql -u root -p < database/student.sql

CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

-- Login accounts
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin'
);

-- Seed the default admin account (username: admin, password: admin123)
-- The password is stored as a bcrypt hash, never in plain text.
INSERT INTO users (username, password)
VALUES ('admin', '$2a$10$h04QIulj4HpJ2/evwj1mXO6II1BmWBqT3gqnwJY01L.iP2UPimiAi')
ON DUPLICATE KEY UPDATE username = username;

-- Students managed by the app
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
);

CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    note VARCHAR(255),
    UNIQUE KEY unique_student_date (student_id, attendance_date),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

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
);
