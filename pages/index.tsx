import type { NextPage } from "next";
import ProductCard from "../components/ProductCard";
import products from "../products";

const Home: NextPage = () => {
  return (
    <div className="px-5 sm:px-10 py-4 text-slate-800">
      <div className="text-2xl font-semibold">Latest Products</div>
      <div className="grid grid-auto-fit-lg">
        {products.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
