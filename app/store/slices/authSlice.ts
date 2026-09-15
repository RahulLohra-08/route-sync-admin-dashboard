import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthResponse, User } from "~/types/auth";

interface AuthState {
  user: User | null;

  accessToken: string | null;

  refreshToken: string | null;

  isAuthenticated: boolean;

  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    /**
     * Store complete authentication response.
     */
    setAuth: (state, action: PayloadAction<AuthResponse>) => {
        const response = action.payload;

        state.user = {
            userId: response.userId,
            fullName: response.fullName,
            email: response.email,
            phoneNumber: response.phoneNumber,
            profileImage: response.profileImage,
            authProvider: response.authProvider,
            role: response.role,
            active: response.active,
        };

        state.accessToken = response.accessToken;
        state.refreshToken = response.refreshToken;

        localStorage.setItem(
            "routesync_access_token",
            response.accessToken
        );

        localStorage.setItem(
            "routesync_refresh_token",
            response.refreshToken
        );

        state.isAuthenticated = true;
        state.isLoading = false;
        },

    /**
     * Store authenticated user.
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    /**
     * Update loading state.
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Logout.
     */
    logout: (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isLoading = false;

        localStorage.removeItem("routesync_access_token");
        localStorage.removeItem("routesync_refresh_token");
    },
  },
});

export const {
  setAuth,
  setUser,
  setLoading,
  logout,
} = authSlice.actions;

export default authSlice.reducer;