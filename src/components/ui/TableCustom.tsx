'use client';

import { Table } from 'antd';
import type { TableProps } from 'antd';

export default function TableCustom<T extends object = object>(props: TableProps<T>) {
  return <Table<T> {...props} />;
}
