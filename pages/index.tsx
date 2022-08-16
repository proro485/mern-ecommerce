import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setCart } from "../app/slices/cartSlice";
import ProductCard from "../components/ProductCard";
import Product from "../model/productModel";
import { HomeProps } from "../types";
import connectMongo from "../utils/connectMongo";

const Home = ({ products }: HomeProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    dispatch(setCart({ cartItems }));
  }, []);

  return (
    <div className="px-5 sm:px-10 py-4 text-slate-800">
      <div className="text-2xl font-semibold">Latest Products</div>
      <div className="grid grid-auto-fit-md">
        {products.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  await connectMongo();

  try {
    const data = await Product.find({});
    const products = JSON.parse(JSON.stringify(data));

    console.log("Products :", products);

    return {
      props: {
        products: products,
      },
    };
  } catch (e) {
    console.log("Error :", e);
    return {
      notFound: true,
    };
  }
};
