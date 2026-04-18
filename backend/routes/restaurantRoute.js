import express from "express";
import multer from "multer";
import {
  addRestaurant,
  listRestaurant,
  removeRestaurant,
} from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

// ✅ Image storage engine setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Ensure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// ✅ Routes
restaurantRouter.post("/add", upload.single("image"), addRestaurant);
restaurantRouter.get("/list", listRestaurant);
restaurantRouter.post("/remove", removeRestaurant);

export default restaurantRouter;
