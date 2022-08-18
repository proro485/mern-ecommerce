import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useToasts } from "react-toast-notifications";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCart } from "../app/slices/cartSlice";
import protectRoute from "../middleware/protectRoute";

const Payment = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const shippingAddress = useAppSelector((state) => state.cart.shippingAddress);

  const handleClick = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const itemsPrice = cartItems.reduce(
        (a, b) => a + b.product.price * b.quantity,
        0
      );

      const orderDetails = {
        userId: user?._id,
        orderItems: cartItems,
        shippingAddress,
        taxPrice: (itemsPrice * 0.15).toFixed(2),
        shippingPrice: 0.0,
        totalPrice: (itemsPrice * 1.15).toFixed(2),
        paidAt: new Date(),
      };

      const { data } = await axios.post("/api/orders", orderDetails, config);

      if (!data.error) {
        localStorage.removeItem("cartItems");
        dispatch(setCart({ cartItems: [] }));
        router.replace(`/users/profile`);
        addToast(data.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (e) {
      console.log("Error :", e);

      addToast("Client Side Error", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="grid lg:grid-auto-fit-xl gap-5 sm:gap-10 my-10 w-screen mx-4 sm:mx-10 text-slate-800">
        <div>
          <div className="text-lg px-5 sm:text-2xl font-semibold pb-4 w-full">
            SHIPPING ADDRESS
          </div>
          <div className="text-lg px-5 sm:text-lg mb-8 w-full">
            {`${shippingAddress?.address}, ${shippingAddress?.city}, ${shippingAddress?.country}, ${shippingAddress?.postalCode}`}
          </div>
          <div className="text-lg px-5 sm:text-2xl font-semibold pb-4 w-full">
            ORDER ITEMS
          </div>
          <div className="border-px border-slate-800 border-b-0">
            {cartItems.map((item) => {
              return (
                <div
                  className="flex items-center justify-between px-2 sm:px-5 py-3 border-b-px border-slate-800 space-x-4"
                  key={item.product._id}
                >
                  <div className="flex items-center space-x-5">
                    <Image
                      src={`/${item.product.image}`}
                      height={70}
                      width={70}
                    />
                    <span className="sm:text-lg line-clamp-1">
                      {item.product.name}
                    </span>
                  </div>
                  <span className="sm:text-lg font-semibold">
                    {item.quantity} x {item.product.price} = $
                    {item.product.price * item.quantity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="border-px border-slate-800 py-3 sm:py-5">
            <div className="text-lg px-5 sm:text-2xl font-semibold pb-4 border-b-2 w-full">
              ORDER SUMMARY
            </div>
            <div className="flex justify-between px-10 py-4 border-b-px border-slate-800">
              <span className="sm:text-lg">Items :</span>
              <span className="sm:text-lg font-semibold">
                $
                {cartItems
                  .reduce((a, b) => {
                    return a + b.quantity * b.product.price;
                  }, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between px-10 py-4 border-b-px border-slate-800">
              <span className="sm:text-lg">Shipping :</span>
              <span className="sm:text-lg font-semibold">$0.00</span>
            </div>
            <div className="flex justify-between px-10 py-4 border-b-px border-slate-800">
              <span className="sm:text-lg">Tax :</span>
              <span className="sm:text-lg font-semibold">
                $
                {(
                  cartItems.reduce((a, b) => {
                    return a + b.quantity * b.product.price;
                  }, 0) * 0.15
                ).toFixed(2)}{" "}
              </span>
            </div>
            <div className="flex justify-between px-10 pt-5">
              <span className="sm:text-lg">Total :</span>
              <span className="sm:text-lg font-semibold">
                $
                {(
                  cartItems.reduce((a, b) => {
                    return a + b.quantity * b.product.price;
                  }, 0) * 1.15
                ).toFixed(2)}{" "}
              </span>
            </div>
            <div className="text-xl font-semibold px-5 py-3 border-b-px border-slate-800"></div>
            <div className="flex justify-center pt-5">
              <button
                onClick={handleClick}
                className="sm:text-lg bg-slate-800 text-white py-3 sm:py-3 w-full mx-3 sm:w-1/2"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

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
