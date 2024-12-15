// Handle order summary on the payment page
function loadOrderSummary() {
    const orderSummary = JSON.parse(localStorage.getItem("orderSummary") || "[]");
    const orderTotal = localStorage.getItem("orderTotal");

    const orderTable = document.getElementById("order-summary-body");
    orderSummary.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rs. ${item.price}</td>
            <td>${item.quantity}</td>
            <td>Rs. ${item.total}</td>
        `;
        orderTable.appendChild(row);
    });

    document.getElementById("order-total").textContent = `Total: Rs. ${orderTotal}`;
}

// Handle payment processing
function processPayment() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("payment-method").value;

    if (!name || !address || !paymentMethod) {
        alert("Please fill all the fields.");
        return;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // Deliver after 3 days
    const deliveryDateFormatted = deliveryDate.toDateString();

    alert(`Thank you for your purchase! Your order will be delivered by ${deliveryDateFormatted}.`);
    localStorage.removeItem("orderSummary");
    localStorage.removeItem("orderTotal");
}

// Event Listeners for the payment page
document.getElementById("processPaymentButton").addEventListener("click", processPayment);
window.addEventListener("load", loadOrderSummary); // Load order summary when the page loads
// Handle order summary on the payment page
function loadOrderSummary() {
    const orderSummary = JSON.parse(localStorage.getItem("orderSummary") || "[]");
    const orderTotal = localStorage.getItem("orderTotal");

    const orderTable = document.getElementById("order-summary-body");
    orderSummary.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rs. ${item.price}</td>
            <td>${item.quantity}</td>
            <td>Rs. ${item.total}</td>
        `;
        orderTable.appendChild(row);
    });

    document.getElementById("order-total").textContent = `Total: Rs. ${orderTotal}`;
}

// Handle payment processing
function processPayment() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("payment-method").value;

    if (!name || !address || !paymentMethod) {
        alert("Please fill all the fields.");
        return;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // Deliver after 3 days
    const deliveryDateFormatted = deliveryDate.toDateString();

    alert(`Thank you for your purchase! Your order will be delivered by ${deliveryDateFormatted}.`);
    localStorage.removeItem("orderSummary");
    localStorage.removeItem("orderTotal");
}

// Event Listeners for the payment page
document.getElementById("processPaymentButton").addEventListener("click", processPayment);
window.addEventListener("load", loadOrderSummary); // Load order summary when the page loads
