import React, { useContext } from "react";
import "./RestaurantDisplay.css";
import { StoreContext } from "../../context/storeContext";
import RestaurantItem from "../RestaurantItem/RestaurantItem";

const RestaurantDisplay = ({
  setSelectedRestaurant,
  selectedFoodId,
  setSelectedFood,
  searchTerm = "",
}) => {
  const { restaurant_list, food_list } = useContext(StoreContext);

  let filteredRestaurants = restaurant_list;

  // If a specific food is selected, show only restaurants that serve this food
  if (selectedFoodId) {
    const selectedFood = food_list.find((f) => f._id === selectedFoodId);

    if (selectedFood) {
      console.log("Selected Food:", selectedFood);

      if (selectedFood.restaurantId) {
        // Filter restaurants by the selected food's restaurantId
        filteredRestaurants = restaurant_list.filter(
          (restaurant) => restaurant._id === selectedFood.restaurantId,
        );
        console.log("Filtered Restaurants:", filteredRestaurants);
      } else {
        // If restaurantId doesn't exist, show all restaurants
        console.log("No restaurantId found, showing all restaurants");
        filteredRestaurants = restaurant_list;
      }
    }
  }

  // Apply search filter
  if (searchTerm) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) =>
        restaurant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        restaurant.location?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  const handleRestaurantClick = (restaurantId) => {
    if (setSelectedRestaurant) {
      setSelectedRestaurant(restaurantId);
    }
    if (setSelectedFood) {
      setSelectedFood(null);
    }
  };

  return (
    <div className="restaurant-display" id="restaurant-display">
      <h2>Restaurants serving this item</h2>
      <div className="restaurant-display-list">
        {filteredRestaurants.map((item, index) => (
          <RestaurantItem
            key={item._id || index}
            id={item._id}
            name={item.name}
            description={item.description}
            image={item.image}
            location={item.location}
            rating={item.rating}
            deliveryTime={item.deliveryTime}
            onClick={() => handleRestaurantClick(item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantDisplay;
