import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  deliveryTime: { type: String, default: "30-45 mins" },
});

const restaurantModel =
  mongoose.models.restaurant || mongoose.model("restaurant", restaurantSchema);

export default restaurantModel;
