import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="flex flex-col my-5 mx-5 rounded-md shadow-md text-slate-800 cursor-pointer">
        <Image
          src={`/${product.image}`}
          height={240}
          width={360}
          className="rounded-t-md"
        />
        <div className="py-5 px-5">
          <div className="text-xl">{product.name}</div>
          <div className="text-slate-600 mt-4 text-lg">
            {product.rating} from {product.numReviews} reviews
          </div>
          <div className="text-2xl mt-2 font-semibold text-slate-600">
            ${product.price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
