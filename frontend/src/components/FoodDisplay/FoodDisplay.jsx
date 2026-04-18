import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({
  category = "All",
  restaurantId,
  onFoodClick,
  searchTerm = "",
}) => {
  const { food_list } = useContext(StoreContext);

  const filteredList = food_list.filter((item) => {
    const matchesCategory =
      category === "All" ||
      item.category?.trim().toLowerCase() === category.trim().toLowerCase();
    const matchesRestaurant =
      !restaurantId || item.restaurantId === restaurantId;
    const matchesSearch =
      !searchTerm ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesRestaurant && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredList.map((item, index) => (
          <FoodItem
            key={item._id || index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            category={item.category}
            foodData={item}
            onFoodClick={onFoodClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
