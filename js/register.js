async function registerUser() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const serverUrl = window.location.protocol === "file:" ? "http://localhost:3000" : "";

    if (!username || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const response = await fetch(`${serverUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, confirmPassword })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Registration failed");
            return;
        }

        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("role", data.role || "admin");

        alert("Registration successful!");
        window.location.href = `${serverUrl}/frontend/dashboard.html`;

    } catch (error) {

        console.error(error);
        alert("Something went wrong while registering.");

    }

}
