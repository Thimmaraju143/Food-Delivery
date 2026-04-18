import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/storeContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const context = useContext(StoreContext);
  const {
    cartItems = {},
    food_list = [],
    removeFromCart,
    getTotalCartAmount,
    url,
  } = context || {};

  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.length === 0 && <p>Loading items...</p>}

        {food_list.map((item) => {
          const quantity = cartItems[item._id];
          if (quantity && quantity > 0) {
            const imageUrl = item.image
              ? `${url}/uploads${item.image.startsWith("/") ? "" : "/"}${
                  item.image
                }`
              : assets.defaultImage || ""; // fallback

            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={imageUrl} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{quantity}</p>
                  <p>${(item.price * quantity).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}

        {Object.keys(cartItems).length === 0 && (
          <p className="empty-cart">Your cart is empty.</p>
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>${total.toFixed(2)}</b>
          </div>

          <button
            onClick={() => {
              console.log("Button clicked, navigating...");
              navigate("/order");
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={() => alert(`Promo applied: ${promoCode}`)}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
