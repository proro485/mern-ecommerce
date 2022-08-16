import Order from "../models/orderModel";
import Product from "../models/productModel";
import User from "../models/userModel";
import connectMongo from "../utils/connectMongo";
import products from "./products";
import users from "./users";

connectMongo();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported successfully");
    process.exit();
  } catch (e) {
    console.log("Error :", e);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed successfully");
    process.exit();
  } catch (e) {
    console.log("Error :", e);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
