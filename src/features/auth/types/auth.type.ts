import type { UserRole } from '@/features/user/types/user.type';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  fullName: string;
  password: string;
}

export interface AuthUser {
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
}
