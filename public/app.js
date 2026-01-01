let cart = [];
let total = 0;

/* =====================
   ADD TO CART
===================== */
function addToCart(item, price) {
  cart.push({ item, price });
  total += price;

  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-total").innerText = total;

  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  cart.forEach((c, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${c.item} - ₹${c.price}
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
  });
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);

  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-total").innerText = total;
  renderCart();
}

/* =====================
   PLACE ORDER (IMPORTANT)
===================== */
function placeOrder() {
  const feedback = document.getElementById("feedback").value;

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  fetch("/save-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cart: cart,
      total: total,
      feedback: feedback
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      cart = [];
      total = 0;
      renderCart();
      document.getElementById("feedback").value = "";
    })
    .catch(err => console.error(err));
}

/* =====================
   SUBMIT FEEDBACK
===================== */
function submitFeedback(e) {
  e.preventDefault();

  const name = document.getElementById("fname").value;
  const rating = document.getElementById("rating").value;
  const message = document.getElementById("message").value;

  fetch("/save-feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      rating,
      message
    })
  })
    .then(res => res.json())
    .then(() => {
      alert("Feedback submitted ❤️");

      document.getElementById("fname").value = "";
      document.getElementById("rating").value = "";
      document.getElementById("message").value = "";
    });
}

/* =====================
   TOGGLE CART
===================== */
function toggleCart() {
  document.getElementById("cart").classList.toggle("show");
}
