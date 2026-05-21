'use client';

import { Select } from 'antd';
import type { SelectProps } from 'antd';

interface SelectCustomProps extends SelectProps {
  // additional props can be added here
}

export default function SelectCustom(props: SelectCustomProps) {
  return <Select {...props} />;
}
