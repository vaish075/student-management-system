// Show which admin is logged in, and wire up the logout button.
document.addEventListener("DOMContentLoaded", () => {

    const username = sessionStorage.getItem("username") || "Admin";
    const welcomeEl = document.getElementById("welcomeMessage");

    if (welcomeEl) {
        welcomeEl.textContent = `Welcome, ${username}`;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    loadStats();

});

async function loadStats() {
    try {
        const response = await fetch("/dashboard/stats");
        const stats = await response.json();

        document.getElementById("totalStudents").textContent = stats.totalStudents || 0;
        document.getElementById("activeStudents").textContent = stats.activeStudents || 0;
        document.getElementById("totalCourses").textContent = stats.totalCourses || 0;

        const attendanceRate = stats.attendanceCount
            ? Math.round((stats.presentCount / stats.attendanceCount) * 100)
            : 0;
        document.getElementById("attendanceRate").textContent = `${attendanceRate}%`;
    } catch (error) {
        console.error(error);
    }
}
