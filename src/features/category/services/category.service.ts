import api from '@/services/api';
import type { ApiResponse } from '@/types/api.type';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../types/category.type';

export const categoryService = {
  getAll(): Promise<ApiResponse<Category[]>> {
    return api.get<ApiResponse<Category[]>>('categories').then((res) => res.data);
  },

  getById(id: number): Promise<ApiResponse<Category>> {
    return api.get<ApiResponse<Category>>(`categories/${id}`).then((res) => res.data);
  },

  create(data: CreateCategoryRequest): Promise<ApiResponse<Category>> {
    return api.post<ApiResponse<Category>>('categories', data).then((res) => res.data);
  },

  update(id: number, data: UpdateCategoryRequest): Promise<ApiResponse<Category>> {
    return api.put<ApiResponse<Category>>(`categories/${id}`, data).then((res) => res.data);
  },

  delete(id: number): Promise<ApiResponse<null>> {
    return api.delete<ApiResponse<null>>(`categories/${id}`).then((res) => res.data);
  },
};
