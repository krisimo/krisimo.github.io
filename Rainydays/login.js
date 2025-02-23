document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("login-form");
    if (!loginForm) {
        return;
    }


    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorDisplay = document.getElementById("login-error");

        if (!username || !password) {
            errorDisplay.textContent = "Please enter both username and password.";
            return;
        }

        try {
            const response = await fetch("https://v2.api.noroff.dev/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data));
                window.location.href = "./index.html"; // Redirect to home
            } else {
                errorDisplay.textContent = "Invalid login credentials.";
            }
        } catch (error) {
            errorDisplay.textContent = "Error logging in. Try again later.";
        }
    });
});
