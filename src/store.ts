import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type StoreType = typeof store;
export type RootStateType = ReturnType<StoreType["getState"]>;
export type DispatchType = StoreType["dispatch"];
console.log(store);
export default store;
