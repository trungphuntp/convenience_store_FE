'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectAuthUser, initAuth } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';

interface Props {
  children: React.ReactNode;
  /** Require ADMIN role in addition to being authenticated */
  adminOnly?: boolean;
  /** Where to redirect unauthenticated visitors (default: /login) */
  redirectTo?: string;
}

export default function RequireAuth({
  children,
  adminOnly = false,
  redirectTo = '/login',
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector(selectAuthUser);
  const [ready, setReady] = useState(false);

  // Rehydrate from localStorage on mount (may already be done by AuthInitializer,
  // but calling again is harmless and ensures standalone pages are protected too).
  useEffect(() => {
    dispatch(initAuth());
    setReady(true);
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      router.replace(redirectTo);
      return;
    }

    if (adminOnly && user.role !== 'ADMIN') {
      router.replace('/');
    }
  }, [ready, user, adminOnly, redirectTo, router]);

  // Show nothing while checking — prevents any flash of protected content.
  if (!ready || !user) return null;
  if (adminOnly && user.role !== 'ADMIN') return null;

  return <>{children}</>;
}
