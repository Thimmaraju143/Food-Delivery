import restaurantModel from "../models/restaurantModel.js";
import fs from "fs";

// ✅ Add Restaurant
const addRestaurant = async (req, res) => {
  const image_filename = req.file?.filename;

  if (!image_filename) {
    return res
      .status(400)
      .json({ success: false, message: "Image upload failed" });
  }

  const restaurant = new restaurantModel({
    name: req.body.name,
    description: req.body.description,
    image: image_filename,
    location: req.body.location,
    rating: req.body.rating || 0,
    deliveryTime: req.body.deliveryTime || "30-45 mins",
  });

  try {
    await restaurant.save();
    res.json({ success: true, message: "Restaurant added successfully" });
  } catch (error) {
    console.log("Add Restaurant Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error adding restaurant" });
  }
};

// ✅ Get All Restaurants
const listRestaurant = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.log("List Restaurant Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching restaurants" });
  }
};

// ✅ Remove Restaurant
const removeRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.body.id);

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    // ✅ Remove image file from uploads folder
    fs.unlink(`uploads/${restaurant.image}`, (err) => {
      if (err) console.log("Error deleting image:", err);
    });

    // ✅ Delete restaurant from DB
    await restaurantModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Restaurant removed" });
  } catch (error) {
    console.log("Remove Restaurant Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing restaurant" });
  }
};

export { addRestaurant, listRestaurant, removeRestaurant };
