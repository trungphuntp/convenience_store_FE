'use client';

import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import type { Product, ProductPageParams } from '../types/product.type';

export function useProductsPage(params: ProductPageParams) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', 'page', params],
    queryFn: () => productService.getPage(params),
  });

  return {
    products: (data?.data?.content ?? []) as Product[],
    totalElements: data?.data?.totalElements ?? 0,
    isLoading,
    error: error ? (error as Error).message : null,
  };
}
