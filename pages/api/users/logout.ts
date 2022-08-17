import { NextApiHandler } from "next";
import { destroyCookie } from "nookies";

const logoutHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      destroyCookie({ res }, "token", { path: "/" });
      res.json({ message: "User successfully logged out" });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
};

export default logoutHandler;
