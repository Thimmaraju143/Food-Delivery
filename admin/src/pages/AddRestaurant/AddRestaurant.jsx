import React, { useState } from "react";
import "./AddRestaurant.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddRestaurant = ({ baseUrl }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    location: "",
    rating: "",
    deliveryTime: "30-45 mins",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("rating", data.rating);
    formData.append("deliveryTime", data.deliveryTime);
    formData.append("image", image); // ✅ Append image file

    try {
      const response = await axios.post(
        `${baseUrl}/api/restaurant/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ✅ Required for file upload
          },
        },
      );

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          location: "",
          rating: "",
          deliveryTime: "30-45 mins",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Server error");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload preview"
            />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Restaurant name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Restaurant description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            value={data.description}
            onChange={onChangeHandler}
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Location</p>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={data.location}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="add-price flex-col">
            <p>Rating</p>
            <input
              type="number"
              name="rating"
              placeholder="4.5"
              value={data.rating}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        <div className="add-delivery-time flex-col">
          <p>Delivery Time</p>
          <input
            type="text"
            name="deliveryTime"
            placeholder="30-45 mins"
            value={data.deliveryTime}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
