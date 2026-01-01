let cart = [];
let total = 0;

/* ADD TO CART */
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
  cart.forEach((c, i) => {
    list.innerHTML += `<li>${c.item} - ₹${c.price}
      <button onclick="removeItem(${i})">❌</button></li>`;
  });
}

function removeItem(i) {
  total -= cart[i].price;
  cart.splice(i, 1);
  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-total").innerText = total;
  renderCart();
}

function clearCart() {
  cart = [];
  total = 0;
  document.getElementById("cart-count").innerText = 0;
  document.getElementById("cart-total").innerText = 0;
  document.getElementById("cart-items").innerHTML = "";
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("show");
}

/* SUBMIT FEEDBACK + SAVE ORDER */
function submitFeedback(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const orderData = {
    cart,
    total,
    name: fname.value,
    rating: rating.value,
    feedback: message.value
  };

  fetch("/save-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);

      cart = [];
      total = 0;
      document.getElementById("cart-count").innerText = 0;
      document.getElementById("cart-total").innerText = 0;
      document.getElementById("cart-items").innerHTML = "";

      fname.value = "";
      rating.value = "";
      message.value = "";
    })
    .catch(() => alert("Error saving order"));
}

/* LOGIN */
function openLogin() {
  document.getElementById("loginModal").style.display = "block";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function login() {
  if (!loginEmail.value || !loginPassword.value) {
    alert("Please enter email and password");
    return;
  }
  alert("Login successful ✅");
  closeLogin();
}
