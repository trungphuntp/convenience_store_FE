export type OrderStatus = 'CREATED' | 'PENDING' | 'CONFIRMED' | 'PAID' | 'CANCELLED';

export const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; color: string }> = {
  CREATED:   { label: 'Mới tạo',       color: 'default' },
  PENDING:   { label: 'Chờ xác nhận',  color: 'orange'  },
  CONFIRMED: { label: 'Đã xác nhận',   color: 'blue'    },
  PAID:      { label: 'Đã thanh toán', color: 'green'   },
  CANCELLED: { label: 'Đã hủy',        color: 'red'     },
};

// Allowed status transitions per backend canTransitionTo logic
export const NEXT_STATUSES: Record<OrderStatus, OrderStatus[]> = {
  CREATED:   ['CONFIRMED', 'CANCELLED'],
  PENDING:   ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PAID', 'CANCELLED'],
  PAID:      [],
  CANCELLED: [],
};

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  userId: string;
  userName: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[] | null;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: string;
  items: OrderItemRequest[];
}

export interface UpdateOrderRequest {
  status: OrderStatus;
}
