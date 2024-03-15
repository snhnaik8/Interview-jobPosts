import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  loggedInUser: string | null; // Add loggedInUser to store username
}

const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        isLoggedIn: false,
        loggedInUser: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      isLoggedIn: false,
      loggedInUser: null,
    };
  }
};

const saveState = (state: AuthState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch {
   
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload; // Store username when logging in
      saveState(state); // Save state to local storage on login
    },
    logout(state) {
      state.isLoggedIn = false;
      state.loggedInUser = null; // Reset loggedInUser when logging out
      localStorage.removeItem('authState');
      window.location.href = '/';  // Remove authState from local storage on logout
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
