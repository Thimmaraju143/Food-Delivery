import orderModel from "../models/orderModel.mjs";
import userModel from "../models/userModel.mjs";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";

  try {
    const { userId, items, address } = req.body;

    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Create and save new order
    const newOrder = new orderModel({
      userId,
      items,
      amount: totalAmount,
      address,
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    // Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 200, 
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Order placement error:", error.message);
    res.json({ success: false, message: "Error placing order" });
  }
};

const verifyOrder = async (req, res) => {
  const { success,orderId } = req.query;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed. Order cancelled." });
    }
  } catch (error) {
    console.error("Order verification error:", error.message);
    res.json({ success: false, message: "Error verifying order" });
  }
};

const userOrders=async(req,res)=>{
  try{
    const orders=await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}
//listing order for admin panel
const listOrders=async (req,res)=>{
  try{
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

//api for updating order status
const updateStatus=async(req,res)=>{
  try{
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
