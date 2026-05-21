import api from '@/services/api';
import type { ApiResponse } from '@/types/api.type';
import type { Cart, AddToCartRequest, UpdateCartItemRequest } from '../types/cart.type';

export const cartService = {
  getCart(): Promise<ApiResponse<Cart>> {
    return api.get<ApiResponse<Cart>>('cart').then((res) => res.data);
  },

  addItem(data: AddToCartRequest): Promise<ApiResponse<Cart>> {
    return api.post<ApiResponse<Cart>>('cart/items', data).then((res) => res.data);
  },

  updateItem(productId: number, data: UpdateCartItemRequest): Promise<ApiResponse<Cart>> {
    return api
      .put<ApiResponse<Cart>>(`cart/items/${productId}`, data)
      .then((res) => res.data);
  },

  removeItem(productId: number): Promise<ApiResponse<null>> {
    return api.delete<ApiResponse<null>>(`cart/items/${productId}`).then((res) => res.data);
  },

  clearCart(): Promise<ApiResponse<null>> {
    return api.delete<ApiResponse<null>>('cart').then((res) => res.data);
  },
};
