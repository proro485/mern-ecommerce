import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsCart, BsPerson } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCart } from "../app/slices/cartSlice";
import { setUser } from "../app/slices/userSlice";

const Header = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    dispatch(setUser(user));
    dispatch(setCart({ cartItems }));
  }, []);

  const handleClick = async () => {
    if (Object.entries(user).length !== 0) {
      const { data } = await axios.post("/api/users/logout");
      if (!data.error) {
        dispatch(setUser({}));
        localStorage.removeItem("user");
        router.push("/");
      } else {
        alert(data.error);
      }
    } else {
      router.push("/users/login");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-screen justify-between items-center border-b-px border-slate-800 py-4 px-5 sm:px-20 text-slate-800 sticky top-0 bg-white z-10">
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
        <span
          className="flex text-md sm:text-lg cursor-pointer"
          onClick={handleClick}
        >
          <BsPerson className="mr-2" size={22} />
          {Object.entries(user).length !== 0 ? "Logout" : "Sign In"}
        </span>
      </span>
    </div>
  );
};

export default Header;
