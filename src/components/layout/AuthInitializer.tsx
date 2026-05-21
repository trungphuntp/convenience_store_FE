'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '@/features/auth/services/auth.service';
import { setUser, initAuth } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // 1. Immediately restore from localStorage (synchronous, no flash)
    dispatch(initAuth());

    // 2. Only call the server when localStorage says a session exists
    const hasSavedSession = Boolean(localStorage.getItem('auth_user'));
    if (!hasSavedSession) return;

    authService
      .getMe()
      .then((res) => dispatch(setUser(res.data)))
      .catch(() => {
        // Interceptor already handles 403 → refresh → force-logout chain.
        // Any remaining error (network, etc.) is silently ignored here.
      });
  }, [dispatch]);

  return null;
}
