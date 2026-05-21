'use client';

import { Tag } from 'antd';
import type { TagProps } from 'antd';

interface TagCustomProps extends TagProps {
  label: string;
}

export default function TagCustom({ label, ...props }: TagCustomProps) {
  return <Tag {...props}>{label}</Tag>;
}
