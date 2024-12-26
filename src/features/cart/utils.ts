import { CartStateType, LOCAL_STORAGE_CART } from "./cartSlice";

export function updateCartLocalStorage(cart: CartStateType) {
  localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart));
}
