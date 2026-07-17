 const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_db"
});

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.error(err);
        return;
    }

    console.log("Database Connected Successfully");
});

module.exports = connection;

