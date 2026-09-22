const studentSelect = document.getElementById("studentSelect");
const attendanceForm = document.getElementById("attendanceForm");
const marksForm = document.getElementById("marksForm");

async function loadAcademicStudents() {
    const response = await fetch("/students");
    const students = await response.json();

    students.forEach((student) => {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = `${student.student_number || student.id} - ${student.name}`;
        studentSelect.appendChild(option);
    });
}

async function loadAcademicRecords() {
    const studentId = studentSelect.value;
    if (!studentId) {
        document.getElementById("attendanceBody").innerHTML = "";
        document.getElementById("marksBody").innerHTML = "";
        return;
    }

    const [attendanceResponse, marksResponse] = await Promise.all([
        fetch(`/attendance/${studentId}`),
        fetch(`/marks/${studentId}`)
    ]);
    const attendance = await attendanceResponse.json();
    const marks = await marksResponse.json();

    document.getElementById("attendanceBody").innerHTML = attendance.map((record) => `
        <tr><td>${record.attendance_date}</td><td>${record.status}</td><td>${record.note || "-"}</td></tr>
    `).join("");

    document.getElementById("marksBody").innerHTML = marks.map((record) => `
        <tr><td>${record.subject}</td><td>${record.assessment}</td><td>${record.score}/${record.max_score}</td><td>${record.term}</td></tr>
    `).join("");
}

attendanceForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!studentSelect.value) {
        alert("Select a student first.");
        return;
    }

    const response = await fetch("/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            studentId: studentSelect.value,
            date: document.getElementById("attendanceDate").value,
            status: document.getElementById("attendanceStatus").value,
            note: document.getElementById("attendanceNote").value
        })
    });
    const data = await response.json();
    alert(data.message);
    if (response.ok) {
        attendanceForm.reset();
        loadAcademicRecords();
    }
});

marksForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!studentSelect.value) {
        alert("Select a student first.");
        return;
    }

    const response = await fetch("/marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            studentId: studentSelect.value,
            subject: document.getElementById("subject").value,
            assessment: document.getElementById("assessment").value,
            score: document.getElementById("score").value,
            maxScore: document.getElementById("maxScore").value,
            term: document.getElementById("term").value
        })
    });
    const data = await response.json();
    alert(data.message);
    if (response.ok) {
        marksForm.reset();
        document.getElementById("maxScore").value = 100;
        loadAcademicRecords();
    }
});

studentSelect.addEventListener("change", loadAcademicRecords);
document.getElementById("logoutBtn").addEventListener("click", logout);
loadAcademicStudents();
