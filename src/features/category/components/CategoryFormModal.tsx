'use client';

import { useEffect } from 'react';
import ModalCustom from '@/components/ui/ModalCustom';
import FormCustom, { FormItemCustom, useFormCustom } from '@/components/ui/FormCustom';
import InputCustom, { InputTextAreaCustom } from '@/components/ui/InputCustom';
import type { Category, CreateCategoryRequest } from '../types/category.type';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryRequest) => void;
  category?: Category | null;
  loading?: boolean;
}

export default function CategoryFormModal({ open, onClose, onSubmit, category, loading }: Props) {
  const [form] = useFormCustom<CreateCategoryRequest>();
  const isEdit = !!category;

  useEffect(() => {
    if (!open) return;
    if (category) {
      form.setFieldsValue({ name: category.name, description: category.description ?? '' });
    } else {
      form.resetFields();
    }
  }, [open, category, form]);

  const handleOk = () => {
    form.validateFields().then((values) => onSubmit(values));
  };

  return (
    <ModalCustom
      title={isEdit ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText={isEdit ? 'Cập nhật' : 'Tạo mới'}
      cancelText="Hủy"
      confirmLoading={loading}
      width={440}
    >
      <FormCustom<CreateCategoryRequest> form={form} layout="vertical" size="middle" className="mt-4">
        <FormItemCustom
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
        >
          <InputCustom placeholder="Nhập tên danh mục" />
        </FormItemCustom>
        <FormItemCustom name="description" label="Mô tả">
          <InputTextAreaCustom rows={3} placeholder="Mô tả (tuỳ chọn)" />
        </FormItemCustom>
      </FormCustom>
    </ModalCustom>
  );
}
