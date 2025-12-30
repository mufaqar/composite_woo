import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
};

// ✅ Load from localStorage
const loadAuth = (): AuthState => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null,
    };
  }
  return { token: null, user: null };
};

const initialState: AuthState = loadAuth();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // ✅ Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      // ✅ Clear from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
