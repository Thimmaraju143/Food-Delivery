import React, { useContext, useEffect, useCallback } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  console.log(success, orderId);

  const verifyPayment = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/api/order/verify?success=${success}&orderId=${orderId}`,
      );
      console.log(response.data);

      if (response.data.success) {
        navigate("/my-orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error verifying payment", error);
      navigate("/cart");
    }
  }, [url, success, orderId, navigate]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
