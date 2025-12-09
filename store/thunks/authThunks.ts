import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../index';
import { loginSuccess, logout, setError, setLoading } from '../slices/authSlice';
import { setUser, clearUser } from '../slices/userSlice';

// Login thunk
export const loginUser = createAsyncThunk<
  void,
  { email: string; password: string },
  { dispatch: AppDispatch; state: RootState }
>('auth/login', async ({ email, password }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await response.json();

    // Simulated API call for now
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response - replace with actual API
    const mockResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600, // 1 hour
      user: {
        id: '1',
        email,
        name: email.split('@')[0],
        username: email.split('@')[0],
      },
    };

    // Dispatch login success
    dispatch(
      loginSuccess({
        token: mockResponse.token,
        refreshToken: mockResponse.refreshToken,
        expiresIn: mockResponse.expiresIn,
      })
    );

    // Set user data
    dispatch(setUser(mockResponse.user));

    return;
  } catch (error: any) {
    dispatch(setError(error.message || 'Login failed'));
    return rejectWithValue(error.message || 'Login failed');
  }
});

// Logout thunk
export const logoutUser = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>('auth/logout', async (_, { dispatch }) => {
  try {
    // TODO: Call logout API endpoint if needed
    // await fetch('/api/auth/logout', { method: 'POST' });

    dispatch(logout());
    dispatch(clearUser());
  } catch (error: any) {
    // Even if API call fails, clear local state
    dispatch(logout());
    dispatch(clearUser());
  }
});

// Refresh token thunk
export const refreshAuthToken = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('auth/refreshToken', async (_, { dispatch, getState, rejectWithValue }) => {
  try {
    const state = getState();
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/refresh', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ refreshToken }),
    // });
    // const data = await response.json();

    // Mock response
    const mockResponse = {
      token: 'new-mock-jwt-token-' + Date.now(),
      expiresIn: 3600,
    };

    dispatch(
      loginSuccess({
        token: mockResponse.token,
        expiresIn: mockResponse.expiresIn,
      })
    );
  } catch (error: any) {
    // If refresh fails, logout user
    dispatch(logout());
    dispatch(clearUser());
    return rejectWithValue(error.message || 'Token refresh failed');
  }
});

