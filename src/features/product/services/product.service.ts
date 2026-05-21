import api from '@/services/api';
import type { ApiResponse, PageResponse } from '@/types/api.type';
import type { Product, CreateProductRequest, UpdateProductRequest, ProductPageParams } from '../types/product.type';

export const productService = {
  getAll(): Promise<ApiResponse<Product[]>> {
    return api.get<ApiResponse<Product[]>>('products').then((res) => res.data);
  },

  getPage(params: ProductPageParams): Promise<ApiResponse<PageResponse<Product>>> {
    return api
      .get<ApiResponse<PageResponse<Product>>>('products/page', { params })
      .then((res) => res.data);
  },

  getById(id: number): Promise<ApiResponse<Product>> {
    return api.get<ApiResponse<Product>>(`products/${id}`).then((res) => res.data);
  },

  create(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    return api.post<ApiResponse<Product>>('products', data).then((res) => res.data);
  },

  update(id: number, data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    return api.put<ApiResponse<Product>>(`products/${id}`, data).then((res) => res.data);
  },

  delete(id: number): Promise<ApiResponse<null>> {
    return api.delete<ApiResponse<null>>(`products/${id}`).then((res) => res.data);
  },
};
