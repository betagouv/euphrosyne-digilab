import { ICart, ICartItem } from "./context";

export function addItemsToCart(runs: ICartItem[]) {
  for (const run of runs) {
    addItemToCart(run);
  }
}

function addItemToCart(run: ICartItem) {
  const cart = getCart();
  cart.items.push(run);
  setCart(cart);
}

export function removeItemFromCart(run: ICartItem) {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.id !== run.id);
  setCart(cart);
}

export function emptyCart() {
  setCart({ items: [] });
}

export function getCart(): ICart {
  if (typeof window === "undefined")
    return {
      items: [],
    };
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : ({ items: [] } as ICart);
}

function setCart(cart: ICart) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
}
