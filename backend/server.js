const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


// ✅ Security + CORS setup
app.use(
  cors({
    origin: "*", // allow micro-frontends from different ports (5173, 5174, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Parse JSON safely
app.use(express.json({ limit: "10mb" }));


// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err);
    process.exit(1);
  });


// ✅ Base Route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});


// ✅ Import API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cart", require("./routes/cart"));


// ✅ Global Error Handler (If any route crashes)
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Something went wrong on server" });
});


// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Backend running at: http://localhost:${PORT}`)
);
