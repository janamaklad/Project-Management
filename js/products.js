document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const searchBar = document.getElementById("search-bar");
    const categoryFilter = document.getElementById("category-filter");

    // Product Data (replace with database fetch if needed)
    const products = [
        { name: "Tea", price: 40, image: "../images/tea.jpg", category: "Beverages" },
        { name: "Nescafe", price: 30, image: "../images/nescafe.jpg", category: "Beverages" },
        { name: "Ice Cream", price: 20, image: "../images/ice cream.webp", category: "Sweets" },
        { name: "Chocolate", price: 50, image: "../images/chocolate.jpg", category: "Sweets" },
        { name: "Redbull", price: 50, image: "../images/redbull.png", category: "Beverages" },
        { name: "Croissant", price: 50, image: "../images/croissant.jpg", category: "Bakery" },
        { name: "Tomato", price: 50, image: "../images/tomato.jpg", category: "Vegetables" }
    ];

    // Extract unique categories
    function getUniqueCategories(products) {
        return [...new Set(products.map(product => product.category))];
    }

    // Populate category dropdown
    function populateCategoryDropdown() {
        const categories = getUniqueCategories(products);
        categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Display products
    function displayProducts(filteredProducts) {
        productList.innerHTML = "";
        filteredProducts.forEach(product => {
            let productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <button class="buy-btn" 
                            data-name="${product.name}" 
                            data-price="${product.price}" 
                            data-image="${product.image}">
                        Buy Now
                    </button>
                </div>
            `;
            productList.innerHTML += productCard;
        });

        // Add event listeners to Buy Now buttons
        document.querySelectorAll(".buy-btn").forEach(button => {
            button.addEventListener("click", function () {
                let name = this.getAttribute("data-name");
                let price = parseFloat(this.getAttribute("data-price"));
                let image = this.getAttribute("data-image");

                addToCart(name, price, image, 1);

                // Show alert message
                alert("Product added to cart successfully!");

                // Add a short delay before redirecting
                setTimeout(() => {
                    window.location.href = "cart.html";
                }, 500);
            });
        });
    }

    // Function to add product to cart
    function addToCart(name, price, image, quantity) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, image, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Initial load
    populateCategoryDropdown();
    displayProducts(products);

    // Search Functionality
    searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Category Filter Functionality
    categoryFilter.addEventListener("change", function () {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = selectedCategory === "all"
            ? products
            : products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", function () {
        // Clear user session (for example, localStorage)
        localStorage.removeItem("user");

        // Redirect to login page
        window.location.href = "login.html"; // Change to your actual login page
    });
});

