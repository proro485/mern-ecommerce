import Link from "next/link";
import { BsCart, BsPerson } from "react-icons/bs";

const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row w-screen justify-between items-center border-b-2 border-slate-800 py-4 px-5 sm:px-20 text-slate-800">
      <Link href="/">
        <span className="text-2xl sm:text-3xl font-semibold">
          MERN eCommerce
        </span>
      </Link>
      <span className="flex items-center space-x-5 pt-3 sm:pt-0">
        <Link href="/cart">
          <span className="flex text-sm sm:text-base">
            <BsCart className="h-4 w-5 mr-2" />
            Cart
          </span>
        </Link>
        <Link href="/login">
          <span className="flex text-sm sm:text-base">
            <BsPerson className="h-5 w-5 mr-2" />
            Sign In
          </span>
        </Link>
      </span>
    </div>
  );
};

export default Header;
