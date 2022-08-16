import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }: { payload: { cartItems: CartItem[] } }) => {
      state.cartItems = payload.cartItems;
      localStorage.setItem("cartItems", JSON.stringify(payload.cartItems));
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
