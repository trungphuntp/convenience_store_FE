'use client';

import { Popover } from 'antd';
import type { PopoverProps } from 'antd';

interface PopoverCustomProps extends PopoverProps {
  children?: React.ReactNode;
}

export default function PopoverCustom({ children, ...props }: PopoverCustomProps) {
  return <Popover {...props}>{children}</Popover>;
}
