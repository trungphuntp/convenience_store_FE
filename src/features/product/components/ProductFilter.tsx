'use client';

import { useMemo } from 'react';
import InputSearchCustom from '@/components/ui/InputSearchCustom';
import SelectCustom from '@/components/ui/SelectCustom';
import SliderCustom from '@/components/ui/SliderCustom';
import { formatPrice } from '@/utils/formatPrice';
import type { Category } from '@/features/category/types/category.type';

interface ProductFilterProps {
  categories: Category[];
  keyword: string;
  selectedCategoryId: number | '';
  priceRange: [number, number];
  maxPrice: number;
  onKeywordChange: (value: string) => void;
  onSearch: (keyword: string) => void;         // chỉ gọi khi nhấn tìm kiếm
  onCategoryChange: (id: number | '') => void; // gọi ngay khi chọn
  onPriceChange: (value: [number, number]) => void;
  onPriceChangeComplete: (value: [number, number]) => void; // gọi khi thả slider
}

export default function ProductFilter({
  categories,
  keyword,
  selectedCategoryId,
  priceRange,
  maxPrice,
  onKeywordChange,
  onSearch,
  onCategoryChange,
  onPriceChange,
  onPriceChangeComplete,
}: ProductFilterProps) {
  const categoryOptions = useMemo(
    () => [
      { value: '', label: 'Tất cả danh mục' },
      ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
    ],
    [categories]
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-5 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Tìm kiếm sản phẩm
          </label>
          <InputSearchCustom
            placeholder="Nhập tên sản phẩm rồi nhấn Enter hoặc 🔍"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            onSearch={onSearch}
            allowClear
            size="middle"
          />
        </div>

        <div className="w-full md:w-52">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Danh mục
          </label>
          <SelectCustom
            options={categoryOptions}
            value={selectedCategoryId}
            onChange={(value) => onCategoryChange(value as number | '')}
            className="w-full"
            size="middle"
          />
        </div>

        <div className="w-full md:w-72">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Khoảng giá:{' '}
            <span className="text-green-700 normal-case font-medium">
              {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
            </span>
          </label>
          <SliderCustom
            min={0}
            max={maxPrice}
            value={priceRange}
            onChange={onPriceChange}
            onChangeComplete={onPriceChangeComplete}
            step={1000}
            tooltip={{ formatter: (v) => formatPrice(v ?? 0) }}
          />
        </div>
      </div>
    </div>
  );
}
