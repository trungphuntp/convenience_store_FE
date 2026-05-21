'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import ButtonCustom from '@/components/ui/ButtonCustom';
import TableCustom from '@/components/ui/TableCustom';
import SelectCustom from '@/components/ui/SelectCustom';
import InputNumberCustom from '@/components/ui/InputNumberCustom';
import SpinCustom from '@/components/ui/SpinCustom';
import OrderStatusBadge from '@/features/order/components/OrderStatusBadge';
import { useOrderDetail } from '@/features/order/hooks/useOrderDetail';
import { ORDER_STATUS_CONFIG, NEXT_STATUSES } from '@/features/order/types/order.type';
import { formatPrice } from '@/utils/formatPrice';
import type { OrderItem, OrderStatus } from '@/features/order/types/order.type';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const orderId = Number(id);

  const {
    order,
    isLoading,
    updateStatus,
    updateItem,
    removeItem,
    isUpdatingStatus,
  } = useOrderDetail(orderId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <SpinCustom size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-center text-gray-500">
        Không tìm thấy đơn hàng.{' '}
        <Link href="/admin/orders" className="text-green-700 underline">
          Quay lại
        </Link>
      </div>
    );
  }

  const nextStatusOptions = NEXT_STATUSES[order.status].map((s) => ({
    value: s,
    label: ORDER_STATUS_CONFIG[s].label,
  }));

  const itemColumns: TableColumnsType<OrderItem> = [
    { title: '#', key: 'idx', width: 50, render: (_, __, i) => i + 1 },
    { title: 'Sản phẩm', dataIndex: 'productName', key: 'name', ellipsis: true },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (v: number) => formatPrice(v),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'qty',
      width: 120,
      render: (qty: number, record) => (
        <InputNumberCustom
          min={1}
          value={qty}
          size="small"
          className="w-20"
          onChange={(v) => { if (v && v !== qty) updateItem(record.id, v); }}
        />
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'subtotal',
      key: 'subtotal',
      width: 130,
      render: (v: number, r) => (
        <span className="font-semibold text-red-600">{formatPrice(v ?? r.price * r.quantity)}</span>
      ),
    },
    {
      title: 'Xóa',
      key: 'del',
      width: 70,
      render: (_, record) => (
        <ButtonCustom
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/orders">
          <ButtonCustom icon={<ArrowLeftOutlined />} type="text">
            Quay lại
          </ButtonCustom>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">Đơn hàng #{order.id}</h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-gray-400 text-sm mt-0.5">
            {new Date(order.createdAt).toLocaleString('vi-VN')}
          </p>
        </div>
      </div>

      {/* Info + Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Order info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-700 mb-3">Thông tin đơn hàng</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Khách hàng</span>
              <span className="font-medium">{order.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-xs text-gray-600">{order.userId}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-semibold text-gray-700">Tổng cộng</span>
              <span className="font-bold text-lg text-red-600">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Status update */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-700 mb-3">Cập nhật trạng thái</h2>
          <p className="text-sm text-gray-500 mb-3">
            Trạng thái hiện tại: <OrderStatusBadge status={order.status} />
          </p>
          {nextStatusOptions.length > 0 ? (
            <div className="flex gap-2">
              {nextStatusOptions.map((opt) => (
                <ButtonCustom
                  key={opt.value}
                  type="primary"
                  size="middle"
                  loading={isUpdatingStatus}
                  onClick={() => updateStatus(opt.value as OrderStatus)}
                  className={
                    opt.value === 'CANCELLED'
                      ? 'bg-red-500! border-red-500!'
                      : 'bg-green-700! border-green-700!'
                  }
                >
                  → {opt.label}
                </ButtonCustom>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">
              Đơn hàng không thể thay đổi trạng thái.
            </p>
          )}
        </div>
      </div>

      {/* Items table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-700 mb-4">
          Danh sách sản phẩm ({order.items?.length ?? 0})
        </h2>

        <TableCustom<OrderItem>
          columns={itemColumns}
          dataSource={order.items ?? []}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: 'Đơn hàng chưa có sản phẩm' }}
          scroll={{ x: 600 }}
        />
      </div>

    </div>
  );
}
