'use client';

import { useSelector } from 'react-redux';
import SpinCustom from './SpinCustom';
import { selectIsLoading } from '@/store/slices/loadingSlice';

export default function GlobalLoading() {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-white/75 backdrop-blur-sm">
      <SpinCustom size="large" />
      <p className="text-gray-500 text-sm font-medium">Đang tải...</p>
    </div>
  );
}
