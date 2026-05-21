export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  categoryId: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  description?: string;
  imageUrl?: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  categoryId?: number;
}

export interface ProductFilterState {
  search: string;
  category: string;
  priceRange: [number, number];
}

export interface ProductPageParams {
  keyword: string;     // bắt buộc
  pageNumber: number;  // bắt buộc
  pageSize: number;    // bắt buộc
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}
