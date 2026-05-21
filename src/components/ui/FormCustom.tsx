'use client';

import { Form } from 'antd';
import type { FormProps, FormItemProps } from 'antd';

export const useFormCustom = Form.useForm;

export default function FormCustom<T = Record<string, unknown>>({
  children,
  ...props
}: FormProps<T> & { children?: React.ReactNode }) {
  return <Form<T> {...props}>{children}</Form>;
}

export function FormItemCustom({
  children,
  ...props
}: FormItemProps & { children?: React.ReactNode }) {
  return <Form.Item {...props}>{children}</Form.Item>;
}
