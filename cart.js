let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---------- ADD TO CART ---------- */
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart();
    updateCartUI();
}

/* ---------- SAVE ---------- */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ---------- UPDATE UI ---------- */
function updateCartUI() {
    const items = document.getElementById("cartItems");
    const count = document.getElementById("cartCount");
    const totalEl = document.getElementById("cartTotal");

    if (!items) return;

    items.innerHTML = "";
    let total = 0;
    let qtyCount = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        qtyCount += item.qty;

        items.innerHTML += `
        <div class="cart-item">
            <span>${item.name}</span>
            <div>
                <button onclick="changeQty(${index}, -1)">−</button>
                ${item.qty}
                <button onclick="changeQty(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">✖</button>
            </div>
        </div>`;
    });

    count.innerText = qtyCount;
    totalEl.innerText = total;
}

/* ---------- QUANTITY ---------- */
function changeQty(index, amount) {
    cart[index].qty += amount;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

/* ---------- REMOVE ---------- */
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

/* ---------- POPUP ---------- */
function toggleCart() {
    const popup = document.getElementById("cartPopup");
    popup.style.display = popup.style.display === "block" ? "none" : "block";
}

updateCartUI();
