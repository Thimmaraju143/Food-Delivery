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

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Database connection
connectDB();

// Static folder for uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurant", restaurantRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Server listener
app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
