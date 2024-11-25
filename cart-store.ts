import { createContext } from "react";

type CartContextType = {
  cart: string[];
  setCart: (cart: string[]) => void;
};

const CartContext = createContext<CartContextType | undefined>({});
