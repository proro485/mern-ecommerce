import { NextApiHandler } from "next";
import { setCookie } from "nookies";
import User from "../../../models/userModel";
import connectMongo from "../../../utils/connectMongo";
import generateToken from "../../../utils/generateToken";

const profileUpdateHandler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { _id, name, email, password } = req.body;

      await connectMongo();

      const user = await User.findById({ _id });

      user.name = name || user.name;
      user.email = email || user.email;

      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();

      if (updatedUser) {
        setCookie({ res }, "token", generateToken(user._id), {
          maxAge: 30 * 24 * 60 * 60,
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          sameSite: "strict",
          path: "/",
        });

        res.json({
          message: "User was updated successfully",
          user: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
          },
        });
      } else {
        res.json({
          error: "There was an error while updating user",
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
};

export default profileUpdateHandler;
