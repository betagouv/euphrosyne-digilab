import { createContext } from "react";

import { PageBadgeType } from "../components/PageBadges";
import type { Run } from "../types/run";
import { addItemsToCart, emptyCart, getCart } from "./localStorage";

interface IFromInformation {
  type: PageBadgeType;
  href: string;
}

export interface ICartItem extends Run {
  from: IFromInformation;
}

export interface ICart {
  items: ICartItem[];
}

export interface ICartContext extends ICart {
  addItems: (items: Run[], from: IFromInformation) => void;
  removeItem: (cartItem: ICartItem) => void;
  emptyCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  items: [],
  addItems: () => {},
  removeItem: () => {},
  emptyCart: () => {},
});

export function createCart(
  items: ICartItem[] | undefined,
  setItems: React.Dispatch<React.SetStateAction<ICartItem[] | undefined>>,
) {
  if (!items) setItems(getCart().items);
  const cart: ICartContext = {
    items: items || [],
    addItems: (items: Run[], from: IFromInformation) => {
      // Only add items that are not already in the cart
      const toInsert = items
        .filter((run) => !cart.items?.find((item) => item.id === run.id))
        .map((run) => ({ ...run, from }));
      setItems([...(cart?.items || []), ...toInsert]);
      addItemsToCart(toInsert);
    },
    removeItem: ({ id }: { id: string }) => {
      const newItems = cart.items.filter((item) => item.id !== id);
      setItems(newItems);
    },
    emptyCart: () => {
      setItems([]);
      emptyCart();
    },
  };
  return cart;
}
