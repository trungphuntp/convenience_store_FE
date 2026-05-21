import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/features/auth/types/auth.type';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(action.payload));
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_user');
      }
    },
    initAuth: (state) => {
      if (typeof window === 'undefined') return;
      try {
        const saved = localStorage.getItem('auth_user');
        if (saved) {
          state.user = JSON.parse(saved) as AuthUser;
          state.isAuthenticated = true;
        }
      } catch {
        // ignore corrupt storage
      }
    },
  },
});

export const { setUser, clearUser, initAuth } = authSlice.actions;
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export default authSlice.reducer;
