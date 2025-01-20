import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { login as loginService, register as registerService } from '../../services/authService';


import { AppDispatch } from '../../store';

export interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

// Define the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; token: string }>) {
      state.isAuthenticated = true;
      state.user = { email: action.payload.email };
      state.token = action.payload.token;

      // Store token in localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('email', action.payload.email);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    checkAuth(state) {
      // Check localStorage to persist the login state
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (token && email) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = { email };
      } else {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      }
    },
  },
});

export const { login, logout, setError, checkAuth } = authSlice.actions;
export default authSlice.reducer;

// Async actions to interact with the API
export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const token = await loginService(email, password);
    dispatch(login({ email, token }));
    dispatch(setError('')); // Reset error message
  } catch (error: unknown) {
    if (error instanceof Error) {
      //console.log(error.message); 
      dispatch(setError(error.message));
    }
  }
};

export const registerUser = (name : string, email: string, password: string, password_confirmation: string) => async (dispatch: AppDispatch) => {
  try {
    const token = await registerService(name, email, password, password_confirmation);
    dispatch(login({ email, token }));
    dispatch(setError('')); // Reset error message
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message); 
      dispatch(setError(error.message));
    } 
  }
};
