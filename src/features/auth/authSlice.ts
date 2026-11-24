import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../app/types";

export interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (
      state,
      action: PayloadAction<string | { token: string; user?: User | null }>
    ) => {
      if (typeof action.payload === "string") {
        return {
          ...state,
          token: action.payload,
          user: null,
        };
      }
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user ?? null,
      };
    },
    loggedOut: (state) => ({
      ...state,
      token: null,
      user: null,
    }),
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
