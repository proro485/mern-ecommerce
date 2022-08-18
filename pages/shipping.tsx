import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setShippingAddress } from "../app/slices/cartSlice";
import protectRoute from "../middleware/protectRoute";

const Shipping = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const shippingAddress = useAppSelector((state) => state.cart.shippingAddress);

  const [address, setAddress] = useState(shippingAddress?.address ?? "");
  const [city, setCity] = useState(shippingAddress?.city ?? "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode ?? ""
  );
  const [country, setCountry] = useState(shippingAddress?.country ?? "");

  const handleClick = () => {
    const shippingAddress = {
      address,
      city,
      postalCode,
      country,
    };

    dispatch(setShippingAddress(shippingAddress));

    router.push("/payment");
  };

  return (
    <div className="flex flex-col items-center space-y-5 text-slate-800 my-[15vh] sm:my-[20vh]">
      <div className="text-3xl mb-3 font-semibold">Shipping Address</div>
      <input
        type="text"
        value={address}
        placeholder="Address"
        className="px-2 w-4/5 sm:w-96 h-12 text-lg border-px border-slate-800 outline-none"
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        value={city}
        placeholder="City"
        className="px-2 w-4/5 sm:w-96 h-12 text-lg border-px border-slate-800 outline-none"
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        value={postalCode}
        placeholder="Postal Code"
        className="px-2 w-4/5 sm:w-96 h-12 text-lg border-px border-slate-800 outline-none"
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <input
        type="text"
        value={country}
        placeholder="Country"
        className="px-2 w-4/5 sm:w-96 h-12 text-lg border-px border-slate-800 outline-none"
        onChange={(e) => setCountry(e.target.value)}
      />
      <div className="pt-3">
        <button
          onClick={handleClick}
          className="bg-slate-800 font-semibold text-white py-2 px-12 cursor-pointer hover:shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Shipping;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = nookies.get(context).token;

    const isAuthorized = token && (protectRoute(token) as any);

    if (!isAuthorized) {
      return {
        redirect: {
          destination: "/users/login",
        },
        props: {},
      };
    }

    return {
      props: {},
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/users/login",
      },
      props: {},
    };
  }
};
