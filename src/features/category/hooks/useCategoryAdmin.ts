'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { categoryService } from '../services/category.service';
import { confirmDelete } from '@/components/ui/ModalCustom';
import type { CreateCategoryRequest, UpdateCategoryRequest } from '../types/category.type';

export function useCategoryAdmin() {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['categories'] });

  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoryService.create(data),
    onSuccess: () => { invalidate(); toast.success('Tạo danh mục thành công'); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryRequest }) =>
      categoryService.update(id, data),
    onSuccess: () => { invalidate(); toast.success('Cập nhật danh mục thành công'); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryService.delete(id),
    onSuccess: () => { invalidate(); toast.success('Xóa danh mục thành công'); },
  });

  const deleteCategory = (id: number) => {
    confirmDelete({
      content: 'Bạn có chắc chắn muốn xóa danh mục này?',
      onOk: () => deleteMutation.mutate(id),
    });
  };

  return {
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
