'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { orderService } from '../services/order.service';
import { confirmDelete } from '@/components/ui/ModalCustom';
import type { OrderStatus } from '../types/order.type';

export function useOrderAdmin() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: () => orderService.getAll(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      orderService.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      toast.success('Cập nhật trạng thái thành công');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => orderService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      toast.success('Xóa đơn hàng thành công');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteOrder = (id: number) => {
    confirmDelete({
      content: 'Bạn có chắc chắn muốn xóa đơn hàng này?',
      onOk: () => deleteMutation.mutate(id),
    });
  };

  return {
    orders: data?.data ?? [],
    isLoading,
    updateStatus: updateStatusMutation.mutate,
    deleteOrder,
    isUpdating: updateStatusMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
