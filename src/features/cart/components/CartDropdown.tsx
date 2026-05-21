'use client';

import Link from 'next/link';
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ButtonCustom from '@/components/ui/ButtonCustom';
import SpinCustom from '@/components/ui/SpinCustom';
import { useCart } from '../hooks/useCart';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { formatPrice } from '@/utils/formatPrice';

export default function CartDropdown() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { cart, isLoading, updateItem, removeItem, clearCart, isClearing } = useCart();

  const handleQtyChange = (productId: number, current: number, delta: number) => {
    const next = current + delta;
    if (next <= 0) {
      removeItem(productId);
    } else {
      updateItem(productId, next);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-72 text-center py-8">
        <ShoppingCartOutlined className="text-4xl text-gray-300 mb-3" />
        <p className="text-gray-500 text-sm mb-4">Đăng nhập để xem giỏ hàng</p>
        <Link href="/login">
          <ButtonCustom type="primary" size="small">
            Đăng nhập
          </ButtonCustom>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-72 flex justify-center py-8">
        <SpinCustom />
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="w-72 text-center py-8">
        <ShoppingCartOutlined className="text-4xl text-gray-300 mb-2" />
        <p className="text-gray-500 text-sm">Giỏ hàng của bạn đang trống</p>
        <Link href="/" className="block mt-3">
          <ButtonCustom size="small">Mua sắm ngay</ButtonCustom>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-80">
      {/* Scrollable items list */}
      <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 pr-1">
        {cart.items.map((item) => (
          <div key={item.productId} className="flex items-center gap-3 py-3">
            <img
              src={item.imageUrl || '/default-product.jpg'}
              alt={item.productName}
              className="w-12 h-12 object-cover rounded-lg shrink-0"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {item.productName}
              </p>
              <p className="text-xs text-gray-400 mb-1">{formatPrice(item.price)}</p>

              {/* Quantity controls */}
              <div className="flex items-center gap-1">
                <ButtonCustom
                  size="small"
                  icon={<MinusOutlined />}
                  className="w-6 h-6 flex items-center justify-center p-0"
                  onClick={() => handleQtyChange(item.productId, item.quantity, -1)}
                />
                <span className="w-6 text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <ButtonCustom
                  size="small"
                  icon={<PlusOutlined />}
                  className="w-6 h-6 flex items-center justify-center p-0"
                  onClick={() => handleQtyChange(item.productId, item.quantity, 1)}
                />
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <p className="text-sm font-bold text-red-600">
                {formatPrice(item.subtotal)}
              </p>
              <ButtonCustom
                type="text"
                danger
                size="small"
                icon={<DeleteOutlined />}
                className="p-0 h-auto"
                onClick={() => removeItem(item.productId)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-3 mt-1">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">Tổng cộng</span>
          <span className="font-bold text-base text-red-600">
            {formatPrice(cart.totalAmount)}
          </span>
        </div>
        <div className="flex gap-2">
          <ButtonCustom
            size="small"
            danger
            onClick={clearCart}
            loading={isClearing}
          >
            Xóa tất cả
          </ButtonCustom>
          <Link href="/cart" className="flex-1">
            <ButtonCustom
              type="primary"
              size="small"
              block
              className="bg-green-700! border-green-700!"
            >
              Xem giỏ hàng →
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </div>
  );
}
