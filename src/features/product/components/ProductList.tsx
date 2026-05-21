"use client";

import SpinCustom from "@/components/ui/SpinCustom";
import EmptyCustom from "@/components/ui/EmptyCustom";
import PaginationCustom from "@/components/ui/PaginationCustom";
import ProductCard from "./ProductCard";
import type { Product } from "../types/product.type";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function ProductList({
  products,
  loading,
  error,
  total,
  page,
  pageSize,
  onPageChange,
}: ProductListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <SpinCustom size="large" />
        <p className="text-gray-400 text-sm">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16">
        <EmptyCustom description="Không tìm thấy sản phẩm phù hợp" />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center">
        <PaginationCustom
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={onPageChange}
          showSizeChanger={false}
          showTotal={(t) => `Tổng ${t} sản phẩm`}
        />
      </div>
    </div>
  );
}
