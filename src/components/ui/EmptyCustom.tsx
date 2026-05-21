'use client';

import { Empty } from 'antd';
import type { EmptyProps } from 'antd';

interface EmptyCustomProps extends EmptyProps {
  // additional props can be added here
}

export default function EmptyCustom(props: EmptyCustomProps) {
  return <Empty {...props} />;
}
