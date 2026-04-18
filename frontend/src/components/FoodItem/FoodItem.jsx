import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  foodData,
  onFoodClick,
}) => {
  const context = useContext(StoreContext);
  const { cartItems = {}, addToCart, removeFromCart, url } = context || {};

  // Ensure image path is properly formatted
  const imageUrl = `${url}/uploads${image.startsWith("/") ? "" : "/"}${image}`;

  const handleFoodClick = (e) => {
    // Don't trigger food selection if clicking on add/remove buttons
    if (e.target.closest(".food-item-image-container")) {
      return;
    }
    if (onFoodClick && foodData) {
      onFoodClick(foodData);
    }
  };

  return (
    <div
      className="food-item"
      onClick={handleFoodClick}
      style={onFoodClick ? { cursor: "pointer" } : {}}
    >
      {/* Food Image & Add Button */}
      <div className="food-item-image-container">
        <img className="food-item-image" src={imageUrl} alt={name} />

        {/* Add & Counter Section */}
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(id);
            }}
            src={assets.add_icon_white}
            alt="Add Item"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(id);
              }}
              src={assets.remove_icon_red}
              alt="Remove Item"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={(e) => {
                e.stopPropagation();
                addToCart(id);
              }}
              src={assets.add_icon_green}
              alt="Add Item"
            />
          </div>
        )}
      </div>

      {/* Food Information */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating Stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
