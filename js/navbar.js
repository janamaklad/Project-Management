document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar from navbar.html
    fetch("../html/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            updateNavbar(); // Call function to update navbar links
        })
        .catch(error => console.error("Error loading navbar:", error));

    function updateNavbar() {
        const navLinks = document.getElementById("nav-links");
        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!navLinks) return; // Prevent errors if navbar isn't loaded yet

        navLinks.innerHTML = ""; // Clear existing links

        if (user) {
            // If user is logged in
            navLinks.innerHTML = `
                <li><a href="../html/homepage.html">Home</a></li>
                <li><a href="../html/cart.html">Cart</a></li>
                <li><a href="../html/aboutus.html">About us</a></li>
                <li><a href="../html/contact.html">Contact us</a></li>
                <li><button id="logout-btn">Logout</button></li>
            `;

            // Add logout functionality
            document.getElementById("logout-btn").addEventListener("click", function () {
                localStorage.removeItem("loggedInUser"); // Remove user from storage
                alert("Logged out successfully!");
                location.reload(); // Reload to update navbar
            });
        } else {
            // If user is not logged in
            navLinks.innerHTML = `
                <li><a href="../html/login.html">Login</a></li>
                <li><a href="../html/register.html">Register</a></li>
            `;
        }
    }
});
