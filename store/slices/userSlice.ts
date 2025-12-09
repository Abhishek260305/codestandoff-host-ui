import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// Load user from localStorage (client-side only)
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user_data');
  if (storedUser) {
    try {
      initialState.currentUser = JSON.parse(storedUser);
    } catch (e) {
      // Invalid JSON, ignore
      localStorage.removeItem('user_data');
    }
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;

      // Persist to localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_data', JSON.stringify(action.payload));
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          ...action.payload,
        };

        // Update localStorage (client-side only)
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(state.currentUser));
        }
      }
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.error = null;

      // Clear localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user_data');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setUser,
  updateUser,
  clearUser,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;

