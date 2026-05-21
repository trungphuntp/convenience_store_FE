'use client';

import { Button } from 'antd';
import type { ButtonProps } from 'antd';

interface ButtonCustomProps extends ButtonProps {
  label?: string;
}

export default function ButtonCustom({ label, children, ...props }: ButtonCustomProps) {
  return <Button {...props}>{label ?? children}</Button>;
}
