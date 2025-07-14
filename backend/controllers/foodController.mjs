import foodModel from "../models/foodModel.mjs";
import fs from "fs";

// ✅ Add Food Item
const addFood = async (req, res) => {
  const image_filename = req.file?.filename;

  if (!image_filename) {
    return res
      .status(400)
      .json({ success: false, message: "Image upload failed" });
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.log("Add Food Error:", error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// ✅ Get All Food Items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("List Food Error:", error);
    res.status(500).json({ success: false, message: "Error fetching foods" });
  }
};

// ✅ Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    // ✅ Remove image file from uploads folder
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.log("Error deleting image:", err);
    });

    // ✅ Delete food from DB
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log("Remove Food Error:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
