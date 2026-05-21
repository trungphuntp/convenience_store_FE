'use client';

import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../services/category.service';
import type { Category } from '../types/category.type';

export function useCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  return {
    categories: (data?.data ?? []) as Category[],
    isLoading,
    error: error ? (error as Error).message : null,
  };
}
