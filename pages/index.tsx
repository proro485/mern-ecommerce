import type { GetServerSideProps } from "next";
import ProductCard from "../components/ProductCard";
import Product from "../models/productModel";
import { HomeProps } from "../types";
import connectMongo from "../utils/connectMongo";

const Home = ({ products }: HomeProps) => {
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
  try {
    await connectMongo();

    const data = await Product.find({});
    const products = JSON.parse(JSON.stringify(data));

    return {
      props: {
        products: products,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
