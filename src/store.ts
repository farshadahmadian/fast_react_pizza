import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type StoreType = typeof store;
export type RootStateType = ReturnType<StoreType["getState"]>;
export type DispatchType = StoreType["dispatch"];
export default store;
