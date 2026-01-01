const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const ORDERS_FILE = path.join(__dirname, "orders.json");

app.post("/save-order", (req, res) => {
  const newOrder = req.body;

  // Read existing orders
  let orders = [];
  if (fs.existsSync(ORDERS_FILE)) {
    const data = fs.readFileSync(ORDERS_FILE, "utf-8");
    orders = JSON.parse(data);
  }

  // Add new order
  orders.push({
    ...newOrder,
    time: new Date().toLocaleString()
  });

  // Save back to file
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

  res.json({ message: "Order saved successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
