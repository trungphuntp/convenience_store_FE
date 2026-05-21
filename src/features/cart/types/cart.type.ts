export interface CartItem {
  productId: number;
  productName: string;
  categoryName: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  userId: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
