let cart = [];
let total = 0;
let orderPlaced = false;   

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
    list.innerHTML += `
      <li>
        ${c.item} - ₹${c.price}
        <button onclick="removeItem(${i})">❌</button>
      </li>`;
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

/* 🟢 PLACE ORDER */
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty ❌");
    return;
  }

  orderPlaced = true;

  alert("🎉 Order Successful!");

  // show feedback after order
  document.querySelector(".feedback-section").style.display = "block";

  // close cart
  document.getElementById("cart").classList.remove("show");
}

/* 🟢 SUBMIT FEEDBACK (ONLY AFTER ORDER) */
function submitFeedback(e) {
e.preventDefault();

if (!orderPlaced) {
  alert("Please place order first ❌");
  return;
}

let finalTotal = total;

if (total > 1000) {
  finalTotal = total * 0.9;
  alert("🎉 10% Discount Applied!\nFinal Amount: ₹" + finalTotal);
}


  const name = document.getElementById("name");
  const rating = document.getElementById("rating");
  const message = document.getElementById("message");
  
  if (name.value === "" || rating.value === "" || message.value === "") {
    alert("Please fill all fields");
    return;
  }

  const orderData = {
  cart: cart,
  total: finalTotal,
  name: name.value,
  rating: rating.value,
  feedback: message.value
};
console.log(orderData);

  // 🔴 THIS WAS MISSING
  fetch("/save-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);   // "Order & Feedback saved successfully"

      // reset everything
      name.value = "";
      rating.value = "";
      message.value = "";

      cart = [];
      total = 0;
      orderPlaced = false;

      document.getElementById("cart-count").innerText = 0;
      document.getElementById("cart-total").innerText = 0;
      document.getElementById("cart-items").innerHTML = "";

      document.querySelector(".feedback-section").style.display = "none";
    })
    .catch(err => {
      console.error(err);
      alert("❌ Server error. Order not saved");
    });
}


/* LOGIN */
function openLogin() {
  document.getElementById("loginModal").style.display = "block";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  // Email validation: must contain @ and .com
  if (!email.includes("@") || !email.endsWith(".com")) {
    alert("Please enter a valid email with @ and .com");
    return;
  }

  if (password === "") {
    alert("Password cannot be empty");
    return;
  }

  alert("Login successful!");
  closeLogin();
}

