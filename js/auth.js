// Shared session guard for protected pages (dashboard, students).
// Bounces back to the login page if the "loggedIn" flag isn't set.
// This is a client-side convenience gate only — see README's "Notes on
// the auth model" for why it isn't real security.
(function requireLogin() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
})();

function logout() {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    window.location.href = "login.html";
}
