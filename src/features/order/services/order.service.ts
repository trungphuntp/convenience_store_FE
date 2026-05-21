import api from '@/services/api';
import type { ApiResponse } from '@/types/api.type';
import type { Order, CreateOrderRequest, UpdateOrderRequest, OrderItemRequest } from '../types/order.type';

export const orderService = {
  getAll(): Promise<ApiResponse<Order[]>> {
    return api.get<ApiResponse<Order[]>>('orders').then((res) => res.data);
  },

  getById(id: number): Promise<ApiResponse<Order>> {
    return api.get<ApiResponse<Order>>(`orders/${id}`).then((res) => res.data);
  },

  create(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
    return api.post<ApiResponse<Order>>('orders', data).then((res) => res.data);
  },

  update(id: number, data: UpdateOrderRequest): Promise<ApiResponse<Order>> {
    return api.put<ApiResponse<Order>>(`orders/${id}`, data).then((res) => res.data);
  },

  delete(id: number): Promise<ApiResponse<null>> {
    return api.delete<ApiResponse<null>>(`orders/${id}`).then((res) => res.data);
  },

  // Checkout from current cart (authenticated user)
  checkout(): Promise<ApiResponse<Order>> {
    return api.post<ApiResponse<Order>>('orders/checkout').then((res) => res.data);
  },

  // Order-item management — requires backend endpoints:
  // POST   /api/orders/{orderId}/items
  // PUT    /api/orders/{orderId}/items/{itemId}
  // DELETE /api/orders/{orderId}/items/{itemId}
  addOrderItem(orderId: number, data: OrderItemRequest): Promise<ApiResponse<Order>> {
    return api
      .post<ApiResponse<Order>>(`orders/${orderId}/items`, data)
      .then((res) => res.data);
  },

  updateOrderItem(
    orderId: number,
    itemId: number,
    data: { quantity: number },
  ): Promise<ApiResponse<Order>> {
    return api
      .put<ApiResponse<Order>>(`orders/${orderId}/items/${itemId}`, data)
      .then((res) => res.data);
  },

  removeOrderItem(orderId: number, itemId: number): Promise<ApiResponse<null>> {
    return api
      .delete<ApiResponse<null>>(`orders/${orderId}/items/${itemId}`)
      .then((res) => res.data);
  },
};
