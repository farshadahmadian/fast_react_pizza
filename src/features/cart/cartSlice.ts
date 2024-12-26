import { createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "./types";
import { MenuItemType } from "../menu/types";
import { RootStateType } from "../../store";

export const LOCAL_STORAGE_CART = "cartData";

export type CartStateType = {
  cart: CartItemType[];
};

const cartString = localStorage.getItem(LOCAL_STORAGE_CART);
const cartData = JSON.parse(cartString || '{"cart": []}');
const initialState: CartStateType = cartData;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(prevState, action) {
      const { payload }: { payload: MenuItemType } = action;

      prevState.cart.push({
        name: payload.name,
        pizzaId: payload.id,
        quantity: 1,
        totalPrice: payload.unitPrice * 1,
        unitPrice: payload.unitPrice,
      });
    },

    increaseItemQuantity(prevState, action) {
      const foundItem = prevState.cart.find(
        (cartItem) => cartItem.pizzaId === action.payload,
      );

      if (!foundItem) return;
      foundItem.quantity++;
      foundItem.totalPrice = foundItem.quantity * foundItem.unitPrice;

      // if (foundItem) {
      //   prevState.cart.forEach((cartItem) => {
      //     if (cartItem.pizzaId === action.payload) {
      //       cartItem.quantity++;
      //       cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
      //       return;
      //     }
      //   });
      // }
    },

    decreaseItemQuantity(prevState, action) {
      const foundItem = prevState.cart.find(
        (cartItem) => cartItem.pizzaId === action.payload,
      );

      if (foundItem && foundItem.quantity === 1) {
        // use one reducer in another reducer:
        cartSlice.caseReducers.removeItemFromCart(prevState, action);
      } else if (foundItem && foundItem.quantity > 1) {
        foundItem.quantity--;
        foundItem.totalPrice = foundItem.quantity * foundItem.unitPrice;
        return;
      }

      // if (foundItem && foundItem.quantity === 1) {
      //   // use one reducer in another reducer:
      //   cartSlice.caseReducers.removeItemFromCart(prevState, action);
      // } else if (foundItem && foundItem.quantity > 1) {
      //   prevState.cart.forEach((cartItem) => {
      //     if (cartItem.pizzaId === action.payload) {
      //       cartItem.quantity--;
      //       cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
      //       return;
      //     }
      //   });
      // }
    },

    removeItemFromCart(prevState, action) {
      prevState.cart = prevState.cart.filter(
        (cartItem) => cartItem.pizzaId !== action.payload,
      );
    },

    clearCart(prevState) {
      prevState.cart = [];
    },
  },
});

/* 
  cart selector functions:
 (1) naming convention: start with "get"
 (2) implementation in cartSlice file rather than the Component file
*/
export function getCart(rootState: RootStateType) {
  return rootState.cart.cart;
}

export function getTotalPizzasNum(rootState: RootStateType) {
  return rootState.cart.cart.reduce((accu, cartItem) => {
    return (accu += cartItem.quantity);
  }, 0);
}

export function getTotalPizzasPrice(rootState: RootStateType) {
  return rootState.cart.cart.reduce((accu, cartItem) => {
    return (accu += cartItem.totalPrice);
  }, 0);
}

export function getAnItemQuantity(itemId: string) {
  /* 
    when getAnItemQuantity(id) is called, it returns the
    selector callback function
  */
  return function (rootState: RootStateType) {
    /* 
      selector callback function, is a function that receives
      the store state, and returns a derived state
    */
    const foundItem = rootState.cart.cart.find(
      (cartItem) => cartItem.pizzaId === itemId,
    );
    return foundItem?.quantity;
  };
}

export const {
  addItemToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
