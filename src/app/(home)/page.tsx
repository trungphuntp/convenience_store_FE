'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadingSlice';
import type { AppDispatch } from '@/store';
import { useProductsPage } from '@/features/product/hooks/useProductsPage';
import { useCategories } from '@/features/category/hooks/useCategories';
import ProductFilter from '@/features/product/components/ProductFilter';
import ProductList from '@/features/product/components/ProductList';
import type { ProductPageParams } from '@/features/product/types/product.type';

const MAX_PRICE = 1_000_000;
const DEFAULT_PAGE_SIZE = 10;

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading: categoriesLoading } = useCategories();

  const [keyword, setKeyword] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);

  const [apiParams, setApiParams] = useState<ProductPageParams>({
    keyword: '',
    pageNumber: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const { products, totalElements, isLoading: productsLoading, error } = useProductsPage(apiParams);

  useEffect(() => {
    dispatch(setLoading(productsLoading || categoriesLoading));
  }, [productsLoading, categoriesLoading, dispatch]);

  const handleSearch = (kw: string) => {
    setKeyword(kw);
    setApiParams((prev) => ({ ...prev, keyword: kw, pageNumber: 0 }));
  };

  const handleCategoryChange = (id: number | '') => {
    setSelectedCategoryId(id);
    setApiParams((prev) => ({
      ...prev,
      categoryId: id !== '' ? id : undefined,
      pageNumber: 0,
    }));
  };

  const handlePriceChangeComplete = (range: [number, number]) => {
    setApiParams((prev) => ({
      ...prev,
      minPrice: range[0],
      maxPrice: range[1],
      pageNumber: 0,
    }));
  };

  const handlePageChange = (page: number) => {
    setApiParams((prev) => ({ ...prev, pageNumber: page - 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Danh sách sản phẩm</h1>
        <p className="text-gray-400 mt-1 text-sm">Khám phá sản phẩm tại cửa hàng tiện lợi</p>
      </div>

      <ProductFilter
        categories={categories}
        keyword={keyword}
        selectedCategoryId={selectedCategoryId}
        priceRange={priceRange}
        maxPrice={MAX_PRICE}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onPriceChange={setPriceRange}
        onPriceChangeComplete={handlePriceChangeComplete}
      />

      <ProductList
        products={products}
        loading={productsLoading}
        error={error}
        total={totalElements}
        page={apiParams.pageNumber + 1}
        pageSize={DEFAULT_PAGE_SIZE}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
