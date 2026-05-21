'use client';

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

interface PaginationCustomProps extends PaginationProps {
  // additional props can be added here
}

export default function PaginationCustom(props: PaginationCustomProps) {
  return <Pagination {...props} />;
}
