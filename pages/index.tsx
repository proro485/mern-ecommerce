import axios from "axios";
import type { GetServerSideProps } from "next";
import ProductCard from "../components/ProductCard";
import { HomeProps } from "../types";

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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { data } = await axios.get("http://localhost:3000/api/products/");
  const products = data.products;

  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: products,
    },
  };
};
