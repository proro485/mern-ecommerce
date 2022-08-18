import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCart } from "../../app/slices/cartSlice";
import QuantitySelector from "../../components/QuantitySelector";
import Rating from "../../components/Rating";
import Product from "../../models/productModel";
import { ProductDetailsProps } from "../../types";
import connectMongo from "../../utils/connectMongo";

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const [quantity, setQuantity] = useState(product.countInStock > 0 ? 1 : 0);

  const addToCart = () => {
    const updatedCart = cartItems.filter(
      (item) => item.product._id != product._id
    );
    updatedCart.push({ product, quantity });
    dispatch(setCart({ cartItems: updatedCart }));

    toast.success("Added to Cart", {
      position: "top-center",
    });
  };

  const increaseQuantity = () => {
    setQuantity((val) => val + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((val) => val - 1);
  };

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
            <div className="flex justify-between items-center px-10 py-4 border-b-px border-slate-800">
              <span className="sm:text-lg">Quantity :</span>
              <QuantitySelector
                quantity={quantity}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                countInStock={product.countInStock}
              />
            </div>
            <div className="flex justify-between px-2 py-2">
              <button
                className={`w-full ${
                  product.countInStock > 0 ? "bg-slate-800" : "bg-slate-600"
                } text-white py-4 cursor-pointer`}
                disabled={product.countInStock <= 0}
                onClick={addToCart}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;

    await connectMongo();

    const data = await Product.findById(id);
    const product = JSON.parse(JSON.stringify(data));

    return {
      props: {
        product: product,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
