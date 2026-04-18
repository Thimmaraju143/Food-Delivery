// Import packages
import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRoute.js";
import { orderRouter } from "./routes/orderRouter.js";
import restaurantRouter from "./routes/restaurantRoute.js";
import "dotenv/config.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// ------------------ MIDDLEWARE ------------------

// Parse JSON
app.use(express.json());

// ✅ CORS CONFIG (use ONE of the below)

// 🔹 OPTION 1: OPEN (for testing - use this first)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

/*
// 🔹 OPTION 2: SECURE (use after testing works)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://food-delivery-frontend-wn5j.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
*/

// ------------------ DATABASE ------------------
connectDB();

// ------------------ STATIC FILES ------------------
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ------------------ API ROUTES ------------------
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurant", restaurantRouter);

// ------------------ ROOT ROUTE ------------------
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ------------------ ERROR HANDLER (OPTIONAL) ------------------
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ success: false, message: err.message });
});

// ------------------ SERVER START ------------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
