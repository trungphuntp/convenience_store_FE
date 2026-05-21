'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { orderService } from '../services/order.service';
import { confirmDelete } from '@/components/ui/ModalCustom';
import type { OrderStatus, OrderItemRequest } from '../types/order.type';

export function useOrderDetail(id: number) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'orders', id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['admin', 'orders', id] });

  const updateStatusMutation = useMutation({
    mutationFn: (status: OrderStatus) => orderService.update(id, { status }),
    onSuccess: (res) => {
      queryClient.setQueryData(['admin', 'orders', id], res);
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      toast.success('Cập nhật trạng thái thành công');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const addItemMutation = useMutation({
    mutationFn: (data: OrderItemRequest) => orderService.addOrderItem(id, data),
    onSuccess: () => { invalidate(); toast.success('Thêm sản phẩm thành công'); },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      orderService.updateOrderItem(id, itemId, { quantity }),
    onSuccess: () => invalidate(),
    onError: (err: Error) => toast.error(err.message),
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: number) => orderService.removeOrderItem(id, itemId),
    onSuccess: () => { invalidate(); toast.success('Đã xóa sản phẩm khỏi đơn hàng'); },
    onError: (err: Error) => toast.error(err.message),
  });

  const removeItem = (itemId: number) => {
    confirmDelete({
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi đơn hàng?',
      onOk: () => removeItemMutation.mutate(itemId),
    });
  };

  return {
    order: data?.data ?? null,
    isLoading,
    updateStatus: updateStatusMutation.mutate,
    addItem: addItemMutation.mutate,
    updateItem: (itemId: number, quantity: number) =>
      updateItemMutation.mutate({ itemId, quantity }),
    removeItem,
    isUpdatingStatus: updateStatusMutation.isPending,
    isAddingItem: addItemMutation.isPending,
    isUpdatingItem: updateItemMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
  };
}
