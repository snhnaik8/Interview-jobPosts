// authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  loggedInUser: string | null; // Add loggedInUser to store username
}

const initialState: AuthState = {
  isLoggedIn: false,
  loggedInUser: null, // Initialize loggedInUser as null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload; // Store username when logging in
    },
    logout(state) {
      state.isLoggedIn = false;
      state.loggedInUser = null; // Reset loggedInUser when logging out
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
