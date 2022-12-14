import { NextApiHandler } from "next";
import Order from "../../../models/orderModel";
import connectMongo from "../../../utils/connectMongo";

const orderHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        userId,
        orderItems,
        shippingAddress,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt,
      } = req.body;

      await connectMongo();

      const newOrder = {
        userId,
        orderItems,
        shippingAddress,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt,
      };

      const order = await Order.create(newOrder);

      if (order) {
        res.status(201).json({
          message: "Order created successfully",
          order: order,
        });
      } else {
        res.status(500).json({
          error: "Order not created",
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
};

export default orderHandler;
