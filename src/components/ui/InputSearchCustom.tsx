'use client';

import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input';

interface InputSearchCustomProps extends SearchProps {
  // additional props can be added here
}

export default function InputSearchCustom(props: InputSearchCustomProps) {
  return <Input.Search {...props} />;
}
