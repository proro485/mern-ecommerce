import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI ?? "");
  } catch (e) {
    console.log("Error :", e);
  }
};

export default connectMongo;
