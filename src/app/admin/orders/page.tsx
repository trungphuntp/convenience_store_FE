'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import ButtonCustom from '@/components/ui/ButtonCustom';
import TableCustom from '@/components/ui/TableCustom';
import SelectCustom from '@/components/ui/SelectCustom';
import OrderStatusBadge from '@/features/order/components/OrderStatusBadge';
import { useOrderAdmin } from '@/features/order/hooks/useOrderAdmin';
import { ORDER_STATUS_CONFIG, NEXT_STATUSES } from '@/features/order/types/order.type';
import { formatPrice } from '@/utils/formatPrice';
import type { Order, OrderStatus } from '@/features/order/types/order.type';

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'Tất cả trạng thái' },
  ...Object.entries(ORDER_STATUS_CONFIG).map(([v, c]) => ({ value: v, label: c.label })),
];

export default function AdminOrdersPage() {
  const { orders, isLoading, updateStatus, deleteOrder } = useOrderAdmin();
  const [statusFilter, setStatusFilter] = useState<string>('');

  const displayed = statusFilter
    ? orders.filter((o) => o.status === statusFilter)
    : orders;

  const columns: TableColumnsType<Order> = [
    { title: '#', key: 'idx', width: 50, render: (_, __, i) => i + 1 },
    { title: 'Mã đơn', dataIndex: 'id', key: 'id', width: 80,
      render: (id: number) => <span className="font-mono text-gray-600">#{id}</span> },
    { title: 'Khách hàng', dataIndex: 'userName', key: 'user', ellipsis: true },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      render: (status: OrderStatus, record) => {
        const nextOpts = NEXT_STATUSES[status].map((s) => ({
          value: s,
          label: ORDER_STATUS_CONFIG[s].label,
        }));
        if (!nextOpts.length) return <OrderStatusBadge status={status} />;
        return (
          <SelectCustom
            value={status}
            options={[
              { value: status, label: ORDER_STATUS_CONFIG[status].label, disabled: true },
              ...nextOpts,
            ]}
            onChange={(v) => updateStatus({ id: record.id, status: v as OrderStatus })}
            size="small"
            className="w-full"
          />
        );
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'total',
      width: 130,
      render: (v: number) => <span className="font-semibold text-red-600">{formatPrice(v)}</span>,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'date',
      width: 150,
      render: (v: string) => new Date(v).toLocaleString('vi-VN'),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 110,
      render: (_, record) => (
        <div className="flex gap-2">
          <Link href={`/admin/orders/${record.id}`}>
            <ButtonCustom size="small" icon={<EyeOutlined />} />
          </Link>
          <ButtonCustom
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteOrder(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
          <p className="text-gray-400 text-sm mt-0.5">{orders.length} đơn hàng</p>
        </div>
        <SelectCustom
          options={STATUS_FILTER_OPTIONS}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as string)}
          className="w-44"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <TableCustom<Order>
          columns={columns}
          dataSource={displayed}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10, showTotal: (t) => `Tổng ${t} đơn hàng` }}
          locale={{ emptyText: 'Chưa có đơn hàng nào' }}
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
}
