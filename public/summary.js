// Load data from sessionStorage
let items = JSON.parse(sessionStorage.getItem("order_items"));
let total = sessionStorage.getItem("order_total");
let note = sessionStorage.getItem("order_note");
let cust = sessionStorage.getItem("customer_name");

// Safety checks
document.getElementById("cust-name").innerText = cust || "Guest";
document.getElementById("sum-total").innerText = total || "0";
document.getElementById("sum-note").innerText = note || "None";

if (!items || items.length === 0) {
    document.getElementById("sum-items").innerHTML = "No items found";
} else {
    document.getElementById("sum-items").innerHTML =
        items.map(i => `${i.name} – ₹${i.price}`).join("<br>");
}
