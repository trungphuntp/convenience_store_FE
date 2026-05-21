'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { productService } from '../services/product.service';
import { confirmDelete } from '@/components/ui/ModalCustom';
import type { CreateProductRequest, UpdateProductRequest } from '../types/product.type';

export function useProductAdmin() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: () => productService.getAll(),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  const createMutation = useMutation({
    mutationFn: (data: CreateProductRequest) => productService.create(data),
    onSuccess: () => { invalidate(); toast.success('Tạo sản phẩm thành công'); },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductRequest }) =>
      productService.update(id, data),
    onSuccess: () => { invalidate(); toast.success('Cập nhật sản phẩm thành công'); },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productService.delete(id),
    onSuccess: () => { invalidate(); toast.success('Xóa sản phẩm thành công'); },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteProduct = (id: number) => {
    confirmDelete({
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      onOk: () => deleteMutation.mutate(id),
    });
  };

  return {
    products: data?.data ?? [],
    isLoading,
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
