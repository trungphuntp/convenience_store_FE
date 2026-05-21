'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ButtonCustom from '@/components/ui/ButtonCustom';
import SpinCustom from '@/components/ui/SpinCustom';
import { useCart } from '@/features/cart/hooks/useCart';
import { orderService } from '@/features/order/services/order.service';
import { formatPrice } from '@/utils/formatPrice';

export default function CartPage() {
  const { cart, isLoading, updateItem, removeItem, clearCart, isRemoving, isClearing } =
    useCart();

  const queryClient = useQueryClient();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      await orderService.checkout();
      toast.success('Đặt hàng thành công!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch {
      // interceptor already toasted the BE error message
    } finally {
      setCheckingOut(false);
    }
  };

  const handleQuantityChange = (productId: number, current: number, delta: number) => {
    const next = current + delta;
    if (next <= 0) {
      removeItem(productId);
    } else {
      updateItem(productId, next);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <SpinCustom size="large" />
        <p className="text-gray-400 text-sm">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingCartOutlined className="text-6xl text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg mb-5">Giỏ hàng của bạn đang trống</p>
        <Link href="/">
          <ButtonCustom type="primary" size="large">
            Tiếp tục mua sắm
          </ButtonCustom>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
        <p className="text-gray-400 mt-1 text-sm">{cart.items.length} sản phẩm</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Cart items list */}
        <div className="flex-1 space-y-3">
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4"
            >
              <img
                src={item.imageUrl || '/default-product.jpg'}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded-lg shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{item.productName}</h3>
                <p className="text-red-600 font-bold text-sm mt-1">
                  {formatPrice(item.price)} / sản phẩm
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <ButtonCustom
                    size="small"
                    icon={<MinusOutlined />}
                    onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
                  />
                  <span className="w-8 text-center font-semibold text-gray-800">
                    {item.quantity}
                  </span>
                  <ButtonCustom
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
                  />
                </div>
              </div>

              <div className="flex flex-col items-end justify-between shrink-0">
                <p className="font-bold text-lg text-red-600">{formatPrice(item.subtotal)}</p>
                <ButtonCustom
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  loading={isRemoving}
                  onClick={() => removeItem(item.productId)}
                >
                  Xóa
                </ButtonCustom>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2">
            <Link href="/">
              <ButtonCustom type="default">← Tiếp tục mua sắm</ButtonCustom>
            </Link>
            <ButtonCustom danger onClick={clearCart} loading={isClearing}>
              Xóa tất cả
            </ButtonCustom>
          </div>
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <h2 className="font-bold text-gray-800 text-lg mb-4">Tóm tắt đơn hàng</h2>

            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {cart.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span className="truncate flex-1 mr-2">
                    {item.productName} × {item.quantity}
                  </span>
                  <span className="shrink-0">{formatPrice(item.subtotal)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 mb-5">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Tổng cộng</span>
                <span className="font-bold text-xl text-red-600">
                  {formatPrice(cart.totalAmount)}
                </span>
              </div>
            </div>

            <ButtonCustom
              type="primary"
              block
              size="large"
              loading={checkingOut}
              onClick={handleCheckout}
              className="bg-green-700! border-green-700! hover:bg-green-600!"
            >
              Đặt hàng
            </ButtonCustom>

            <Link href="/" className="block mt-3">
              <ButtonCustom type="default" block>
                Tiếp tục mua sắm
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
