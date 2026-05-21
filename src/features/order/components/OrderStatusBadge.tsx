'use client';

import TagCustom from '@/components/ui/TagCustom';
import { ORDER_STATUS_CONFIG } from '../types/order.type';
import type { OrderStatus } from '../types/order.type';

interface Props {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: Props) {
  const { label, color } = ORDER_STATUS_CONFIG[status] ?? { label: status, color: 'default' };
  return <TagCustom label={label} color={color} />;
}
