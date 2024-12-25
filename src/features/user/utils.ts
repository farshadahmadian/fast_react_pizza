import { LOCAL_STORAGE_USER, UserStateType } from "./userSlice";

export function updateUserLocalStorage(user: UserStateType) {
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
}
