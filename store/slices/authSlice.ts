import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  expiresAt: null,
  isLoading: false,
  error: null,
};

// Load initial state from localStorage (client-side only)
if (typeof window !== 'undefined') {
  const storedToken = localStorage.getItem('auth_token');
  const storedRefreshToken = localStorage.getItem('auth_refresh_token');
  const storedExpiresAt = localStorage.getItem('auth_expires_at');
  
  if (storedToken) {
    initialState.token = storedToken;
    initialState.refreshToken = storedRefreshToken || null;
    initialState.expiresAt = storedExpiresAt ? parseInt(storedExpiresAt, 10) : null;
    initialState.isAuthenticated = true;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken?: string;
        expiresIn?: number;
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || null;
      
      // Calculate expiration time
      if (action.payload.expiresIn) {
        state.expiresAt = Date.now() + action.payload.expiresIn * 1000;
      } else {
        // Default to 24 hours if not provided
        state.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      }
      
      state.isLoading = false;
      state.error = null;

      // Persist to localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.token);
        if (action.payload.refreshToken) {
          localStorage.setItem('auth_refresh_token', action.payload.refreshToken);
        }
        if (state.expiresAt) {
          localStorage.setItem('auth_expires_at', state.expiresAt.toString());
        }
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.expiresAt = null;
      state.error = null;

      // Clear localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_refresh_token');
        localStorage.removeItem('auth_expires_at');
      }
    },
    refreshToken: (state, action: PayloadAction<{ token: string; expiresIn?: number }>) => {
      state.token = action.payload.token;
      
      if (action.payload.expiresIn) {
        state.expiresAt = Date.now() + action.payload.expiresIn * 1000;
      } else {
        state.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      }

      // Update localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.token);
        if (state.expiresAt) {
          localStorage.setItem('auth_expires_at', state.expiresAt.toString());
        }
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
  loginSuccess,
  logout,
  refreshToken,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;

