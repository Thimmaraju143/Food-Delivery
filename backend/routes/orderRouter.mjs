import express from "express";
import authMiddleware from "../middleware/auth.mjs";
import { verifyOrder } from "../controllers/orderController.mjs";
import {
  listOrders,
  placeOrder,
  userOrders,
  updateStatus,
} from "../controllers/orderController.mjs";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status",updateStatus)

export { orderRouter };
