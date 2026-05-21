'use client';

import { useEffect } from 'react';
import ModalCustom from '@/components/ui/ModalCustom';
import FormCustom, { FormItemCustom, useFormCustom } from '@/components/ui/FormCustom';
import SelectCustom from '@/components/ui/SelectCustom';
import InputNumberCustom from '@/components/ui/InputNumberCustom';
import { useProducts } from '@/features/product/hooks/useProducts';
import type { OrderItemRequest } from '../types/order.type';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: OrderItemRequest) => void;
  loading?: boolean;
}

export default function AddOrderItemModal({ open, onClose, onSubmit, loading }: Props) {
  const [form] = useFormCustom<OrderItemRequest>();
  const { products } = useProducts();

  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  const handleOk = () => {
    form.validateFields().then((values) => onSubmit(values));
  };

  const productOptions = products.map((p) => ({
    value: p.id,
    label: `${p.name} — ${p.stock > 0 ? `Còn ${p.stock}` : 'Hết hàng'}`,
    disabled: p.stock === 0,
  }));

  return (
    <ModalCustom
      title="Thêm sản phẩm vào đơn hàng"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Thêm"
      cancelText="Hủy"
      confirmLoading={loading}
      width={420}
    >
      <FormCustom<OrderItemRequest> form={form} layout="vertical" size="middle" className="mt-4">
        <FormItemCustom
          name="productId"
          label="Sản phẩm"
          rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
        >
          <SelectCustom
            options={productOptions}
            placeholder="Chọn sản phẩm"
            showSearch
            className="w-full"
          />
        </FormItemCustom>
        <FormItemCustom
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
        >
          <InputNumberCustom min={1} className="w-full" />
        </FormItemCustom>
      </FormCustom>
    </ModalCustom>
  );
}
