import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  maxQuantity: number;
};

type CartState = {
  items: CartItem[];
};

const STORAGE_KEY = "cart";

function loadInitialState(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.items) ? parsed : { items: [] };
  } catch {
    return { items: [] };
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: loadInitialState(),
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const incoming = action.payload;
      const existing = state.items.find((item) => item.id === incoming.id);

      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + incoming.quantity,
          incoming.maxQuantity,
        );
      } else {
        state.items.push({
          ...incoming,
          quantity: Math.min(incoming.quantity, incoming.maxQuantity),
        });
      }
    },

    setQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (!item) return;

      const quantity = Math.max(
        1,
        Math.min(action.payload.quantity, item.maxQuantity),
      );
      item.quantity = quantity;
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, setQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

/** Selectors */
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export { STORAGE_KEY as CART_STORAGE_KEY };
