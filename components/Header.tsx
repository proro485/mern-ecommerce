import { ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row w-screen justify-between items-center border-b-2 border-slate-800 py-4 px-5 sm:px-20">
      <Link href="/">
        <span className="text-2xl sm:text-3xl font-semibold">
          MERN eCommerce
        </span>
      </Link>
      <span className="flex items-center space-x-5 pt-3 sm:pt-0">
        <Link href="/cart">
          <span className="flex text-sm sm:text-base">
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Cart
          </span>
        </Link>
        <Link href="/login">
          <span className="flex text-sm sm:text-base">
            <UserIcon className="h-5 w-5 mr-1" />
            Sign In
          </span>
        </Link>
      </span>
    </div>
  );
};

export default Header;
