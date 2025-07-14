import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Whether it's a home-cooked meal or a delicious dish from a
            restaurant, every bite tells a story. Different cultures have unique
            flavors that make their cuisine special. Exploring new foods allows
            us to experience the world through taste. No matter where you are,
            good food has the power to make any day better! Let me know if you
            need any changes! 😊
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>fooddelivery@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">copyright 2025 @ food delivery</p>
    </div>
  );
};

export default Footer;
