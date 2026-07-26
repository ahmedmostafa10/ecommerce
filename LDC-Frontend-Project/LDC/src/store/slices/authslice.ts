import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../services/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const STORAGE_KEY = "auth";

function loadInitialState(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, isAuthenticated: false };
    const parsed = JSON.parse(raw);
    return parsed?.user
      ? { user: parsed.user, isAuthenticated: true }
      : { user: null, isAuthenticated: false };
  } catch {
    return { user: null, isAuthenticated: false };
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

/** Selectors */
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export { STORAGE_KEY as AUTH_STORAGE_KEY };
