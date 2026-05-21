'use client';

import { useEffect } from 'react';
import ModalCustom from '@/components/ui/ModalCustom';
import FormCustom, { FormItemCustom, useFormCustom } from '@/components/ui/FormCustom';
import InputCustom, { InputTextAreaCustom } from '@/components/ui/InputCustom';
import InputNumberCustom from '@/components/ui/InputNumberCustom';
import SelectCustom from '@/components/ui/SelectCustom';
import type { Product, CreateProductRequest } from '../types/product.type';
import type { Category } from '@/features/category/types/category.type';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProductRequest) => void;
  product?: Product | null;
  categories: Category[];
  loading?: boolean;
}

export default function ProductFormModal({ open, onClose, onSubmit, product, categories, loading }: Props) {
  const [form] = useFormCustom<CreateProductRequest>();
  const isEdit = !!product;

  useEffect(() => {
    if (!open) return;
    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description ?? '',
        imageUrl: product.imageUrl ?? '',
        categoryId: product.categoryId,
      });
    } else {
      form.resetFields();
    }
  }, [open, product, form]);

  const handleOk = () => {
    form.validateFields().then((values) => onSubmit(values));
  };

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));

  return (
    <ModalCustom
      title={isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText={isEdit ? 'Cập nhật' : 'Tạo mới'}
      cancelText="Hủy"
      confirmLoading={loading}
      width={560}
    >
      <FormCustom<CreateProductRequest> form={form} layout="vertical" size="middle" className="mt-4">
        <FormItemCustom name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
          <InputCustom placeholder="Nhập tên sản phẩm" />
        </FormItemCustom>

        <div className="flex gap-4">
          <FormItemCustom
            name="price"
            label="Giá (₫)"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
            className="flex-1"
          >
            <InputNumberCustom min={0} className="w-full" placeholder="0" />
          </FormItemCustom>
          <FormItemCustom
            name="stock"
            label="Tồn kho"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
            className="flex-1"
          >
            <InputNumberCustom min={0} className="w-full" placeholder="0" />
          </FormItemCustom>
        </div>

        <FormItemCustom
          name="categoryId"
          label="Danh mục"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
        >
          <SelectCustom options={categoryOptions} placeholder="Chọn danh mục" className="w-full" />
        </FormItemCustom>

        <FormItemCustom name="description" label="Mô tả">
          <InputTextAreaCustom rows={3} placeholder="Mô tả sản phẩm (tuỳ chọn)" />
        </FormItemCustom>

        <FormItemCustom name="imageUrl" label="URL hình ảnh">
          <InputCustom placeholder="https://..." />
        </FormItemCustom>
      </FormCustom>
    </ModalCustom>
  );
}
