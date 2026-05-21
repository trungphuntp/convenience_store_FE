'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Slider } from 'antd';
import type { GetProps } from 'antd';

type AntdSliderProps = GetProps<typeof Slider>;

interface SliderRangeCustomProps {
  min?: number;
  max?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  onChangeComplete?: (value: [number, number]) => void;
  step?: number;
  tooltip?: AntdSliderProps['tooltip'];
  className?: string;
}

export default function SliderCustom({ onChange, onChangeComplete, value, ...props }: SliderRangeCustomProps) {
  // Cast needed: antd Slider uses union types for range/single that TypeScript can't narrow at JSX level
  const SliderAny = Slider as React.ComponentType<any>;
  return (
    <SliderAny
      range
      value={value}
      onChange={(v: number[]) => onChange?.(v as [number, number])}
      onChangeComplete={(v: number[]) => onChangeComplete?.(v as [number, number])}
      {...props}
    />
  );
}
