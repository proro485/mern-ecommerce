import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";
import Rating from "./Rating";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="flex flex-col my-3 sm:my-5 mx-2 sm:mx-5 rounded-md shadow-md text-slate-800 cursor-pointer">
        <Image
          src={`/${product.image}`}
          height={240}
          width={360}
          className="rounded-t-md"
        />
        <div className="py-5 px-5">
          <div className="text-xl">{product.name}</div>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div className="text-xl sm:text-2xl mt-2 font-semibold text-slate-600">
            ${product.price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
