import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Rating from "../../components/Rating";
import { ProductDetailsProps } from "../../types";

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-auto-fit-lg mx-5 my-10 w-full lg:w-4/5">
        <div className="max-h-fit">
          <Image src={`/${product.image}`} height={420} width={560} />
        </div>
        <div className="flex flex-wrap flex-col py-2 sm:py-5 sm:px-10">
          <span className="text-xl sm:text-2xl pb-5 font-semibold border-b-px border-slate-400">
            {product.name}
          </span>
          <span className="sm:text-lg my-2 border-b-px border-slate-400">
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </span>
          <span className="text-xl sm:text-2xl font-semibold pb-2 border-b-px border-slate-400">
            ${product.price}
          </span>
          <span className="sm:text-lg pt-5">{product.description}</span>
        </div>
        <div className="max-h-fit">
          <div className="border-px border-slate-800 w-full mt-5">
            <div className="flex justify-between px-10 py-4 border-b-px border-slate-800">
              <span className="sm:text-lg">Price :</span>
              <span className="sm:text-lg">${product.price}</span>
            </div>
            <div className="flex justify-between px-10 py-4 border-b-px border-slate-800">
              <span className="sm:text-lg">Status :</span>
              <span className="sm:text-lg">
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex justify-between px-2 py-2">
              <button
                className="w-full bg-slate-800 text-white py-4"
                disabled={product.countInStock > 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getServerSideProps: GetServerSideProps<
  ProductDetailsProps
> = async (context) => {
  const { id } = context.query;
  const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);

  const product = data.product;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: product,
    },
  };
};
