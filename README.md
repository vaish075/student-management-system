# Student Management System

A student database management system with Node/Express, MySQL, and a plain HTML/CSS/JS frontend.

## Included features

- Login and registration with bcrypt password hashing
- User role field returned during authentication
- Dashboard statistics for students, courses, and attendance
- Student profiles with admission, guardian, contact, and status fields
- Student search by ID, name, email, or phone
- Course and status filtering
- Attendance recording with daily upsert behavior
- Marks recording by subject, assessment, and term
- Attendance and marks history for each selected student
- Automatic database initialization and safe upgrades for existing tables

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create your `.env` file from the example and fill in your MySQL credentials:
   ```
   cp .env.example .env
   ```

3. Create the database and tables by running the schema file against MySQL (optional because the server initializes it automatically):
   ```
   mysql -u root -p < database/student.sql
   ```
   This also seeds one login account: **username `admin`, password `admin123`**.
   Change this password after your first login (there's no "change password"
   screen yet — for now that means updating the `users` table directly).

4. Start the server:
   ```
   npm start
   ```

5. Open **http://localhost:3000** — it redirects to the login page.

## Project structure

- `backend/` — Express server, routes, controllers, models
- `frontend/` — HTML pages (served by the Express server itself, so relative
  paths like `../css/style.css` resolve correctly)
- `css/`, `js/` — shared stylesheet and client-side scripts
- `database/student.sql` — schema + seed admin account

## Main pages

- `/frontend/login.html` — login
- `/frontend/register.html` — create an account
- `/frontend/dashboard.html` — summary statistics
- `/frontend/students.html` — student profiles and filtering
- `/frontend/academic.html` — attendance and marks

## Notes on the auth model

Login checks a bcrypt-hashed password against the `users` table and, on
success, sets a flag in `sessionStorage` on the client. This is enough to
gate the frontend pages for a small internal tool, but it is **not** a
substitute for real server-side sessions or tokens — anyone who calls the
API routes directly (e.g. `/students`) bypasses the login page entirely.
If this is going to be exposed beyond a trusted local network, add proper
session/JWT-based auth on the API routes themselves.

