export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: UserRole;
  fullName?: string;
}

export interface UpdateUserRequest {
  email?: string;
  fullName?: string;
  role?: UserRole;
}
