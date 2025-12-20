const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json()); // VERY IMPORTANT

// Serve public folder
app.use(express.static(path.join(__dirname, "public")));

// Test route
app.get("/test", (req, res) => {
    res.send("OK");
});

// Save order route
app.post("/save-order", (req, res) => {
    try {
        const filePath = path.join(__dirname, "orders.json");
        let orders = [];

        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf8");
            if (data.trim()) {
                orders = JSON.parse(data);
            }
        }

        orders.push(req.body);

        fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

        res.json({ success: true });
    } catch (err) {
        console.error("SAVE ERROR:", err);
        res.status(500).json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


