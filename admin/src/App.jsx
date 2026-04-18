import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import AddRestaurant from "./pages/AddRestaurant/AddRestaurant";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const baseUrl = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add baseUrl={baseUrl} />} />
          <Route
            path="/add-restaurant"
            element={<AddRestaurant baseUrl={baseUrl} />}
          />
          <Route path="/list" element={<List baseUrl={baseUrl} />} />
          <Route path="/orders" element={<Orders url={baseUrl} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
