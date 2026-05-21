'use client';

import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import type { Product } from '../types/product.type';

export function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
  });

  const products: Product[] = data?.data ?? [];

  const maxPrice =
    products.length > 0
      ? Math.ceil(Math.max(...products.map((p) => p.price)) / 1000) * 1000
      : 1000000;

  return {
    products,
    isLoading,
    error: error ? (error as Error).message : null,
    maxPrice,
  };
}
