import express from "express"
import { addToCart,removeFromCart,getCart } from "../controllers/cartController.mjs"
import authMiddleware from "../middleware/auth.mjs";
const cartRouter=express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)






export default cartRouter;