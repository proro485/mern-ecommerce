import { NextApiHandler } from "next";
import products from "../../../products";

const handler: NextApiHandler = (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({ message: "Success", products: products });
  }
};

export default handler;
