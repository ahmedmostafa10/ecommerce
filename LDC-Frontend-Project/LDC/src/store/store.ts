import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CART_STORAGE_KEY } from "./slices/cartslice";
import authReducer, { AUTH_STORAGE_KEY } from "./slices/authslice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state.auth));
  } catch {
    // Storage can be full or blocked (private mode); the cart still works
    // in memory, so this is not worth surfacing.
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
