'use client';

import { Card } from 'antd';
import type { CardProps } from 'antd';

interface CardCustomProps extends CardProps {
  // additional props can be added here
}

export default function CardCustom({ children, ...props }: CardCustomProps) {
  return <Card {...props}>{children}</Card>;
}
