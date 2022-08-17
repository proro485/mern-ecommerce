import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCart } from "../app/slices/cartSlice";
import QuantitySelector from "../components/QuantitySelector";

const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const handleIncrease = (id: string) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product._id == id)
        return { ...item, quantity: item.quantity + 1 };

      return item;
    });

    dispatch(setCart({ cartItems: updatedCartItems }));
  };

  const handleDecrease = (id: string) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product._id == id)
        return { ...item, quantity: item.quantity - 1 };

      return item;
    });

    dispatch(setCart({ cartItems: updatedCartItems }));
  };

  const removeItem = (id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.product._id != id);
    dispatch(setCart({ cartItems: updatedCartItems }));
  };

  const handleClick = () => {
    router.push("/shipping");
  };

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-[35vh]">
        <span className="text-2xl font-semibold text-slate-800">
          Your Cart is empty :(
        </span>
        <Link href="/">
          <div className="cursor-pointer px-7 py-2 my-3 border-2 border-slate-800 hover:bg-slate-800 hover:text-white">
            Explore
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="grid lg:grid-auto-fit-xl gap-5 sm:gap-10 my-10 w-screen mx-4 sm:mx-10 text-slate-800">
        <div>
          <div className="border-px border-slate-800 border-b-0">
            {cartItems.map((item) => {
              return (
                <div className="flex items-center justify-between px-2 sm:px-10 py-3 border-b-px border-slate-800 space-x-4">
                  <Image
                    src={`/${item.product.image}`}
                    height={70}
                    width={70}
                  />
                  <span className="sm:text-lg line-clamp-1">
                    {item.product.name}
                  </span>
                  <span className="sm:text-lg font-semibold">
                    ${item.product.price}
                  </span>
                  <QuantitySelector
                    quantity={item.quantity}
                    increaseQuantity={() => handleIncrease(item.product._id)}
                    decreaseQuantity={() => handleDecrease(item.product._id)}
                    countInStock={item.product.countInStock}
                  />
                  <div>
                    <AiOutlineDelete
                      size={22}
                      className="cursor-pointer"
                      onClick={() => removeItem(item.product._id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="border-px border-slate-800 py-3 sm:py-5">
            <div className="text-lg px-5 sm:text-2xl font-semibold pb-2 border-b-2 w-full">
              SUBTOTAL (
              {cartItems.reduce((a, b) => {
                return a + b.quantity;
              }, 0)}
              ) ITEMS
            </div>
            <div className="text-xl font-semibold px-5 py-3 border-b-px border-slate-800">
              $
              {cartItems
                .reduce((a, b) => {
                  return a + b.quantity * b.product.price;
                }, 0)
                .toFixed(2)}
            </div>
            <div className="flex justify-center pt-5">
              <button
                disabled={!cartItems.length}
                onClick={handleClick}
                className="sm:text-lg bg-slate-800 text-white py-3 sm:py-3 w-full mx-3 sm:w-1/2"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
