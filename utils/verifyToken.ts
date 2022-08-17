import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
  path: process.cwd() + "/.env.local",
});

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_SIGNATURE ?? "");

  return decoded;
};

export default verifyToken;
