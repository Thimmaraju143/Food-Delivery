import React from "react";
import "./RestaurantItem.css";
import { StoreContext } from "../../context/storeContext";

const RestaurantItem = ({
  id,
  name,
  description,
  image,
  location,
  rating,
  deliveryTime,
  onClick,
}) => {
  const { url } = React.useContext(StoreContext);

  // Ensure image path is properly formatted
  const imageUrl = `${url}/uploads${image.startsWith("/") ? "" : "/"}${image}`;

  return (
    <div className="restaurant-item" onClick={onClick}>
      <div className="restaurant-item-image-container">
        <img className="restaurant-item-image" src={imageUrl} alt={name} />
      </div>
      <div className="restaurant-item-info">
        <div className="restaurant-item-name-rating">
          <p>{name}</p>
          <div className="rating">
            <span>{rating} ⭐</span>
          </div>
        </div>
        <p className="restaurant-item-desc">{description}</p>
        <p className="restaurant-item-location">{location}</p>
        <p className="restaurant-item-delivery">{deliveryTime}</p>
      </div>
    </div>
  );
};

export default RestaurantItem;
