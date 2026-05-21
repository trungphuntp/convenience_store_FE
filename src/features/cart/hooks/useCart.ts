'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { cartService } from '../services/cart.service';
import { confirmDelete } from '@/components/ui/ModalCustom';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import type { AddToCartRequest } from '../types/cart.type';

export function useCart() {
  const queryClient = useQueryClient();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
    enabled: isAuthenticated,
    retry: false,
  });

  const cart = data?.data ?? null;
  const cartCount = cart?.totalItems ?? 0;

  const addMutation = useMutation({
    mutationFn: (req: AddToCartRequest) => cartService.addItem(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Đã thêm vào giỏ hàng');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      cartService.updateItem(productId, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const removeMutation = useMutation({
    mutationFn: (productId: number) => cartService.removeItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    },
  });

  const clearMutation = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Đã xóa toàn bộ giỏ hàng');
    },
  });

  const addItem = (req: AddToCartRequest) => {
    if (!isAuthenticated) {
      toast.warn('Vui lòng đăng nhập để thêm vào giỏ hàng');
      return;
    }
    addMutation.mutate(req);
  };

  const removeItem = (productId: number) => {
    confirmDelete({
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
      onOk: () => removeMutation.mutate(productId),
    });
  };

  const clearCart = () => {
    confirmDelete({
      title: 'Xóa toàn bộ giỏ hàng',
      content: 'Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?',
      onOk: () => clearMutation.mutate(),
    });
  };

  return {
    cart,
    cartCount,
    isLoading,
    addItem,
    updateItem: (productId: number, quantity: number) =>
      updateMutation.mutate({ productId, quantity }),
    removeItem,
    clearCart,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    isClearing: clearMutation.isPending,
  };
}
