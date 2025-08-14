import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type { AuthState, User } from "../types/user";
import { loadUserFromLocalStorage, saveUserToLocalStorage, clearUserFromLocalStorage } from "../utils/localStorage";

const initialState: AuthState = {
  user: loadUserFromLocalStorage(),
  isAuthenticated: !!loadUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveUserToLocalStorage(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      clearUserFromLocalStorage();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
