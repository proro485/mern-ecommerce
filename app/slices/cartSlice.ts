import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CartState {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress | null;
}

const initialState: CartState = {
  cartItems: [],
  shippingAddress: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }: { payload: { cartItems: CartItem[] } }) => {
      state.cartItems = payload.cartItems;
      localStorage.setItem("cartItems", JSON.stringify(payload.cartItems));
    },
    setShippingAddress: (state, { payload }: { payload: ShippingAddress }) => {
      state.shippingAddress = payload;
      localStorage.setItem("shippingAddress", JSON.stringify(payload));
    },
  },
});

export const { setCart, setShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;
