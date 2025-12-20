function placeOrder(event) {
    if (event) event.preventDefault();

    const priceList = {
        "Idli": 50, "Dosa": 70, "Veg Pulao": 130, "Veg Pizza": 180, "Veg Burger": 140,
        "Chicken Biryani": 220, "Mutton Biryani": 280, "Fish Curry": 240,
        "Chicken Kabab": 230, "Mutton Kabab": 260,
        "Gulab Jamun": 100, "Brownie": 130, "Ice Cream": 110, "Kheer": 90, "Donut": 120,
        "Panipuri": 40, "Bhelpuri": 50, "Pav Bhaji": 120, "Vada Pav": 45, "Samosa": 50
    };

    let checked = document.querySelectorAll("input[type='checkbox']:checked");
    let note = document.getElementById("note").value;

    if (checked.length === 0) {
        alert("Please select at least one item");
        return;
    }

    let items = [];
    let total = 0;

    checked.forEach(item => {
        let food = item.value;
        items.push({
            name: food,
            price: priceList[food]
        });
        total += priceList[food];
    });

    const order = {
        items: items,
        total: total,
        note: note,
        time: new Date().toLocaleString()
    };

    // For summary page
    sessionStorage.setItem("order_items", JSON.stringify(items));
    sessionStorage.setItem("order_total", total);
    sessionStorage.setItem("order_note", note);

    // ✅ FIXED ROUTE NAME
    fetch("/save-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            window.location.href = "summary.html";
        } else {
            alert("Error saving order");
        }
    })
    .catch(err => {
        console.error("Order not saved", err);
        alert("Error saving order");
    });
}



