import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
  path: process.cwd() + "/.env.local",
});

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI ?? "");
  } catch (e) {
    console.log("Error :", e);
  }
};

export default connectMongo;
