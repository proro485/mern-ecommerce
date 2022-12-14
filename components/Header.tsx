import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BsCart, BsPerson } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCart, setShippingAddress } from "../app/slices/cartSlice";
import { setUser } from "../app/slices/userSlice";

const Header = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const shippingAddress = JSON.parse(
      localStorage.getItem("shippingAddress") || "null"
    );

    dispatch(setShippingAddress(shippingAddress));
    dispatch(setUser(user));
    dispatch(setCart({ cartItems }));
  }, []);

  const handleClick = async () => {
    if (user) {
      const { data } = await axios.post("/api/users/logout");
      if (!data.error) {
        dispatch(setUser(null));
        localStorage.removeItem("user");
        router.push("/");
        toast.success(data.message, {
          position: "top-center",
        });
      } else {
        toast.error(data.error, {
          position: "top-center",
        });
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
        <Link href="/cart">
          <span className="flex text-md sm:text-lg cursor-pointer">
            <BsCart className="mr-2" size={20} />
            Cart
          </span>
        </Link>
        <Link href="/users/profile">
          <span
            className={`flex text-md sm:text-lg cursor-pointer ${
              user ? "visible" : "hidden"
            }`}
          >
            <BsPerson className="mr-2" size={22} />
            Profile
          </span>
        </Link>
        <span
          className="flex text-md sm:text-lg cursor-pointer"
          onClick={handleClick}
        >
          {user ? (
            <IoIosLogOut className="mr-2" size={22} />
          ) : (
            <BsPerson className="mr-2" size={22} />
          )}

          {user ? "Logout" : "Sign In"}
        </span>
      </span>
    </div>
  );
};

export default Header;
