import { NextApiHandler } from "next";
import { setCookie } from "nookies";
import User from "../../../models/userModel";
import connectMongo from "../../../utils/connectMongo";
import generateToken from "../../../utils/generateToken";

const registerHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;

      await connectMongo();

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(409).json({
          error: "User already exists",
        });
      }

      const user = await User.create({ name, email, password });
      if (user) {
        setCookie({ res }, "token", generateToken(user._id), {
          maxAge: 30 * 24 * 60 * 60,
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          sameSite: "strict",
          path: "/",
        });

        res.status(201).json({
          message: "User created successfully",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
      } else {
        res.status(400).json({
          error: "Invalid User Data",
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
};

export default registerHandler;
