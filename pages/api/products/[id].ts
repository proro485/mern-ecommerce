import { NextApiHandler } from "next";
import products from "../../../products";

const handler: NextApiHandler = (req, res) => {
  if (req.method === "GET") {
    const id = req.query.id;
    const product = products.find((p) => p._id === id);

    if (product) {
      res.status(200).json({ message: "Success", data: product });
    } else {
      res.status(404).json({ message: "Product not found", data: null });
    }
  }
};

export default handler;
