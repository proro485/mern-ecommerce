import bcryptjs from "bcryptjs";
import { NextApiHandler } from "next";
import { setCookie } from "nookies";
import User from "../../../models/userModel";
import connectMongo from "../../../utils/connectMongo";
import generateToken from "../../../utils/generateToken";

const loginHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      await connectMongo();

      const user = await User.findOne({ email });
      const isPasswordValid =
        user && (await bcryptjs.compare(password, user.password));

      if (user && isPasswordValid) {
        setCookie({ res }, "token", generateToken(user._id), {
          maxAge: 30 * 24 * 60 * 60,
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          sameSite: "strict",
          path: "/",
        });

        res.json({
          message: "User successfully logged in",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
      } else if (user) {
        res.status(401).json({
          error: "Invalid Password",
        });
      } else if (!user) {
        res.status(401).json({
          error: "User not found",
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
};

export default loginHandler;
