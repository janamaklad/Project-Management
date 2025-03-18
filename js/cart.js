document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cart-table-body");
    let cartTotal = document.getElementById("cart-total");
    cartTable.innerHTML = "";
    let totalAmount = 0;

    if (cart.length === 0) {
        cartTable.innerHTML = "<tr><td colspan='6' class='text-center'>Your cart is empty.</td></tr>";
        cartTotal.innerText = "$0.00";
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        cartTable.innerHTML += `
            <tr>
                <td><img src="${item.image}" class="cart-item img-fluid" width="50"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
    });

    cartTotal.innerText = `$${totalAmount.toFixed(2)}`;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

function proceedToCheckout() {
    window.location.href = "../html/checkout.html";
}
