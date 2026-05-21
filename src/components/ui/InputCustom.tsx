'use client';

import { Input } from 'antd';
import type { InputProps, GetProps } from 'antd';

type InputPasswordProps = GetProps<typeof Input.Password>;

export default function InputCustom(props: InputProps) {
  return <Input {...props} />;
}

export function InputPasswordCustom(props: InputPasswordProps) {
  return <Input.Password {...props} />;
}

type TextAreaProps = GetProps<typeof Input.TextArea>;

export function InputTextAreaCustom(props: TextAreaProps) {
  return <Input.TextArea {...props} />;
}
