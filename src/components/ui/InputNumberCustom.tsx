'use client';

import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';

export default function InputNumberCustom(props: InputNumberProps<number>) {
  return <InputNumber<number> {...props} />;
}
