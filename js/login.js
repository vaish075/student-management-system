async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const serverUrl = window.location.protocol === "file:" ? "http://localhost:3000" : "";

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {

        const response = await fetch(`${serverUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login failed");
            return;
        }

        // Flag the session as logged in so the other pages can check it.
        // (See README: this is a lightweight client-side gate, not a
        // replacement for real server-side sessions/tokens.)
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("role", data.role || "admin");

        window.location.href = `${serverUrl}/frontend/dashboard.html`;

    } catch (error) {

        console.error(error);
        alert("Something went wrong while logging in.");

    }

}
