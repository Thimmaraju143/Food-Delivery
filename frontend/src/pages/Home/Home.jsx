import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import RestaurantDisplay from "../../components/RestaurantDisplay/RestaurantDisplay";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = ({ searchTerm = "" }) => {
  const [category, setCategory] = useState("All");
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div>
      <Header />
      {!selectedFood ? (
        <>
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay
            category={category}
            onFoodClick={setSelectedFood}
            searchTerm={searchTerm}
          />
        </>
      ) : (
        <>
          <button onClick={() => setSelectedFood(null)} className="back-btn">
            Back to Foods
          </button>
          <RestaurantDisplay
            selectedFoodId={selectedFood._id}
            setSelectedFood={setSelectedFood}
            searchTerm={searchTerm}
          />
        </>
      )}
      <AppDownload />
    </div>
  );
};

export default Home;
