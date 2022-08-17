import Link from "next/link";
import { useEffect } from "react";
import { BsCart, BsPerson } from "react-icons/bs";
import { useAppDispatch } from "../app/hooks";
import { setCart } from "../app/slices/cartSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    dispatch(setCart({ cartItems }));
  }, []);

  return (
    <div className="flex flex-col sm:flex-row w-screen justify-between items-center border-b-px border-slate-800 py-4 px-5 sm:px-20 text-slate-800">
      <Link href="/">
        <span className="text-2xl sm:text-3xl font-semibold cursor-pointer">
          MERN eCommerce
        </span>
      </Link>
      <span className="flex items-center space-x-5 pt-3 sm:pt-0">
        <Link href="/cart" className="">
          <span className="flex text-md sm:text-lg cursor-pointer">
            <BsCart className="mr-2" size={20} />
            Cart
          </span>
        </Link>
        <Link href="/users/login">
          <span className="flex text-md sm:text-lg cursor-pointer">
            <BsPerson className="mr-2" size={22} />
            Sign In
          </span>
        </Link>
      </span>
    </div>
  );
};

export default Header;
