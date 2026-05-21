import api, { resetRefreshFailCount } from '@/services/api';
import type { ApiResponse } from '@/types/api.type';
import type { LoginRequest, RegisterRequest, AuthUser } from '../types/auth.type';

export const authService = {
  login(data: LoginRequest): Promise<ApiResponse<AuthUser>> {
    return api.post<ApiResponse<AuthUser>>('auth/login', data).then((res) => {
      resetRefreshFailCount();   // new session → fresh refresh quota
      return res.data;
    });
  },

  register(data: RegisterRequest): Promise<ApiResponse<AuthUser>> {
    return api.post<ApiResponse<AuthUser>>('auth/register', data).then((res) => res.data);
  },

  refresh(): Promise<ApiResponse<null>> {
    return api.post<ApiResponse<null>>('auth/refresh').then((res) => res.data);
  },

  logout(): Promise<ApiResponse<null>> {
    return api.post<ApiResponse<null>>('auth/logout').then((res) => res.data);
  },

  getMe(): Promise<ApiResponse<AuthUser>> {
    return api.get<ApiResponse<AuthUser>>('users/me').then((res) => res.data);
  },
};
