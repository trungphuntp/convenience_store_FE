import api from '@/services/api';
import type { ApiResponse } from '@/types/api.type';
import type { User, CreateUserRequest, UpdateUserRequest } from '../types/user.type';

export const userService = {
  getAll(): Promise<ApiResponse<User[]>> {
    return api.get<ApiResponse<User[]>>('users').then((res) => res.data);
  },

  getById(id: string): Promise<ApiResponse<User>> {
    return api.get<ApiResponse<User>>(`users/${id}`).then((res) => res.data);
  },

  create(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return api.post<ApiResponse<User>>('users', data).then((res) => res.data);
  },

  update(id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
    return api.put<ApiResponse<User>>(`users/${id}`, data).then((res) => res.data);
  },

  delete(id: string): Promise<ApiResponse<null>> {
    return api.delete<ApiResponse<null>>(`users/${id}`).then((res) => res.data);
  },
};
