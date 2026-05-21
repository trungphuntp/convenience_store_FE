'use client';

import { Spin } from 'antd';
import type { SpinProps } from 'antd';

interface SpinCustomProps extends SpinProps {
  // additional props can be added here
}

export default function SpinCustom(props: SpinCustomProps) {
  return <Spin {...props} />;
}
