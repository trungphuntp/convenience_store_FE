export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;   // trang hiện tại (0-indexed)
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
