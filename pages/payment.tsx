import Image from "next/image";
import { useAppSelector } from "../app/hooks";

const Payment = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const shippingAddress = useAppSelector((state) => state.cart.shippingAddress);

  const handleClick = () => {};

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
                <div className="flex items-center justify-between px-2 sm:px-5 py-3 border-b-px border-slate-800 space-x-4">
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
                disabled={!cartItems.length}
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
