import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
  path: process.cwd() + "/.env.local",
});

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_SIGNATURE ?? "", {
    expiresIn: "30d",
  });
};

export default generateToken;
