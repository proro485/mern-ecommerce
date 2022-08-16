import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";

interface QuantitySelectorProps {
  quantity: number;
  countInStock: number;
  increaseQuantity: any;
  decreaseQuantity: any;
}

const QuantitySelector = (props: QuantitySelectorProps) => {
  return (
    <div className="flex items-center">
      <button
        disabled={props.quantity <= 1}
        className={`cursor-pointer outline-none ${
          props.quantity <= 1 ? "text-slate-600" : "text-slate-800"
        }`}
        onClick={props.decreaseQuantity}
      >
        <AiFillMinusSquare size={22} />
      </button>
      <span className="px-4 w-7 flex justify-center text-lg">
        {props.quantity}
      </span>
      <button
        disabled={props.quantity == props.countInStock}
        className={`cursor-pointer outline-none ${
          props.quantity == props.countInStock
            ? "text-slate-600"
            : "text-slate-800"
        }`}
        onClick={props.increaseQuantity}
      >
        <AiFillPlusSquare size={22} />
      </button>
    </div>
  );
};

export default QuantitySelector;
