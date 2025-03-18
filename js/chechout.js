document.addEventListener("DOMContentLoaded", function () {
    loadCheckoutItems();

    document.getElementById("checkout-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;

        if (!name || !email || !address) {
            alert("Please fill all fields!");
            return;
        }

        alert("Order placed successfully!");
        localStorage.removeItem("cart"); // Clear cart after placing order
        window.location.href = "cart.html"; // Redirect to cart page
    });
});

function loadCheckoutItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let checkoutContainer = document.getElementById("checkout-items");

    if (cart.length === 0) {
        checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(product => {
        let item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <span>${product.name}</span>
            <span>$${product.price}</span>
            <span>Qty: ${product.quantity}</span>
        `;
        checkoutContainer.appendChild(item);
    });
}
