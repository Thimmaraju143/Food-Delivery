import userModel from "../models/userModel.mjs";

//add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Addes to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove items from user cart
const removeFromCart = async (req, res) => {
  const removeFromCart = async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };
};

//fetch user cart data
const getCart = async (req, res) => {
  try {
    const userData = await userModel
      .findById(req.body.userId)
      .populate("cartData.productId");
    const cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error retrieving cart data" });
  }
};


export { addToCart, removeFromCart, getCart };
