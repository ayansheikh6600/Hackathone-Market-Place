import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the structure of the user state
interface User {
  name : string;
  email: string;
  password:string;
  phone?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Login action
export const login = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data; // { user, token }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// Signup action
export const signup = createAsyncThunk<
  { user: User; token: string },
  User,
  { rejectValue: string }
>('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/auth/signup', userData);
    return response.data; // { user, token }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Signup failed');
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      toast.info('Logged out successfully');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        toast.success('Login successful');
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        toast.error(state.error);
      });

    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        toast.success('Signup successful');
      })
      .addCase(signup.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
        toast.error(state.error);
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
