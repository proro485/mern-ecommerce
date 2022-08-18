import { CartItem } from "./app/slices/cartSlice";

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface ProductDetailsProps {
  product: Product;
}

export interface HomeProps {
  products: Product[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  orderItems: CartItem[];
  totalPrice: Number;
  paidAt: Date;
}

export interface ProfileProps {
  user: User;
  orders: Order[];
}
