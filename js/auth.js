// Define the fixed admin credentials
const fixedUser = {
    email: "rawan@gmail.com",
    password: "123456"
};

// Function to toggle password visibility
function togglePassword(id) {
    let input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

// Function to show error messages
function showError(id, message) {
    let element = document.getElementById(id);
    if (element) {
        element.innerText = message;
    }
}

// Handle Signup (Validation + Store user in localStorage)
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm_password").value.trim();

    // Clear previous errors
    showError("nameError", "");
    showError("emailError", "");
    showError("passwordError", "");
    showError("confirmPasswordError", "");

    let isValid = true;

    // Name validation
    if (name.length < 3) {
        showError("nameError", "Name must be at least 3 characters.");
        isValid = false;
    }

    // Email validation
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        showError("emailError", "Invalid email format.");
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        showError("passwordError", "Password must be at least 6 characters.");
        isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        showError("confirmPasswordError", "Passwords do not match.");
        isValid = false;
    }

    if (!isValid) return; // Stop submission if validation fails

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("Email already exists!");
        return;
    }

    let newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser)); // Automatically login user

    alert("Signup successful! Redirecting to homepage.");
    window.location.href = "../html/homepage.html";
});

/// Handle Login (Validation + Check fixedUser OR registered users)
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        alert("Login successful! Redirecting to homepage.");
        window.location.href = "../html/homepage.html";
    } else {
        alert("Invalid email or password!");
    }
});
