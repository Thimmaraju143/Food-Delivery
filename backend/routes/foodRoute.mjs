import express from "express";
import multer from "multer";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.mjs";

const foodRouter = express.Router();

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
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
