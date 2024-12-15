// Medicines Data
const medicines = {
    analgesics: [
        { name: "Paracetamol", price: 100 },
        { name: "Ibuprofen", price: 155 },
        { name: "Aspirin", price: 120 },
        { name: "Codeine", price: 200 },
        { name: "Tramadol", price: 250 },
        { name: "Diclofenac", price: 300 }
    ],
    antibiotics: [
        { name: "Amoxicillin", price: 200 },
        { name: "Ciprofloxacin", price: 259 },
        { name: "Doxycycline", price: 245 },
        { name: "Azithromycin", price: 223 },
        { name: "Cephalexin", price: 215 },
        { name: "Metronidazole", price: 200 }
    ],
    antidepressants: [
        { name: "Sertraline", price: 30 },
        { name: "Fluoxetine", price: 88 },
        { name: "Citalopram", price: 100 },
        { name: "Venlafaxine", price: 126 },
        { name: "Amitriptyline", price: 75 },
        { name: "Bupropion", price: 115 }
    ],
    antihistamines: [
        { name: "Cetirizine", price: 50 },
        { name: "Loratadine", price: 100 },
        { name: "Diphenhydramine", price: 69 },
        { name: "Fexofenadine", price: 98 }
    ],
    antihypertensives: [
        { name: "Amlodipine", price: 80 },
        { name: "Lisinopril", price: 90 },
        { name: "Losartan", price: 122 },
        { name: "Metoprolol", price: 70 },
        { name: "Propranolol", price: 156 },
        { name: "Hydrochlorothiazide", price: 80 }
    ]
};

// Show medicines for selected category
function showMedicines(category) {
    const container = document.getElementById("medicines");
    container.innerHTML = ""; // Clear previous list

    medicines[category].forEach(medicine => {
        const row = document.createElement("div");
        row.className = "medicine-row";
        row.innerHTML = `
            <span>${medicine.name} (Rs. ${medicine.price})</span>
            <input type="number" min="1" value="1" id="qty-${medicine.name}">
            <button class="add-btn" onclick="addToCart('${medicine.name}', ${medicine.price})">Add</button>
        `;
        container.appendChild(row);
    });
}

// Track total price globally
let totalPrice = 0;

// Add medicine to cart
function addToCart(name, price) {
    const quantity = parseInt(document.getElementById(`qty-${name}`).value) || 1;
    const total = price * quantity;

    const tableBody = document.getElementById("table-body");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>Rs. ${price}</td>
        <td>${quantity}</td>
        <td>Rs. ${total}</td>
        <td><button onclick="removeFromCart(this, ${total})">Remove</button></td>
    `;
    tableBody.appendChild(row);

    updateTotalPrice(total);
}

// Update total price
function updateTotalPrice(amount) {
    totalPrice += amount;
    document.getElementById("total-price").textContent = `Rs. ${totalPrice}`;
}

// Remove medicine from cart
function removeFromCart(button, rowTotal) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotalPrice(-rowTotal); // Subtract from total
}

// Save cart to localStorage
function saveFavorites() {
    const tableRows = document.querySelectorAll("#table-body tr");
    const cartItems = [];

    tableRows.forEach(row => {
        const name = row.cells[0].innerText;
        const price = parseInt(row.cells[1].innerText.replace("Rs. ", ""));
        const quantity = parseInt(row.cells[2].innerText);
        cartItems.push({ name, price, quantity });
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Cart saved successfully!");
}

// Load favorites from localStorage
function loadFavorites() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    cartItems.forEach(item => {
        addToCart(item.name, item.price);
        const lastRow = document.querySelector("#table-body tr:last-child");
        lastRow.cells[2].innerText = item.quantity;
    });

    alert("Favorites loaded successfully!");
}

// Proceed to buy now
function buyNow() {
    if (totalPrice === 0) {
        alert("Your cart is empty. Please add medicines to proceed.");
        return;
    }

    const cartSummary = [];
    const rows = document.querySelectorAll("#table-body tr");

    rows.forEach(row => {
        const name = row.cells[0].innerText;
        const price = parseInt(row.cells[1].innerText.replace("Rs. ", ""));
        const quantity = parseInt(row.cells[2].innerText);
        const total = parseInt(row.cells[3].innerText.replace("Rs. ", ""));
        cartSummary.push({ name, price, quantity, total });
    });

    // Save cart to localStorage for checkout
    localStorage.setItem("orderSummary", JSON.stringify(cartSummary));
    localStorage.setItem("orderTotal", totalPrice);

    window.location.href = "buynow.html"; // Redirect to checkout page
}

// Reset cart
function resetCart() {
    document.getElementById("table-body").innerHTML = "";
    totalPrice = 0;
    document.getElementById("total-price").textContent = "Rs. 0";
}

// Event Listeners
document.getElementById("saveFavoritesButton").addEventListener("click", saveFavorites);
document.getElementById("loadFavoritesButton").addEventListener("click", loadFavorites);
document.getElementById("buyNowButton").addEventListener("click", buyNow);

// Add to Favourites and Apply Favourites
function addToFavourites() {
    saveFavorites(); // Same as saving the cart to localStorage
}

function applyFavourites() {
    loadFavorites(); // Same as loading saved items from localStorage
}

document.getElementById("addToFavoritesButton").addEventListener("click", addToFavourites);
document.getElementById("applyFavouritesButton").addEventListener("click", applyFavourites);
