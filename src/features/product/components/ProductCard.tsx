"use client";

import { useState } from "react";
import CardCustom from "@/components/ui/CardCustom";
import TagCustom from "@/components/ui/TagCustom";
import ButtonCustom from "@/components/ui/ButtonCustom";
import InputNumberCustom from "@/components/ui/InputNumberCustom";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/features/cart/hooks/useCart";
import type { Product } from "../types/product.type";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, description, price, stock, imageUrl, categoryName } = product;
  const { addItem, isAdding } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({ productId: product.id, quantity });
  };

  return (
    <CardCustom
      hoverable
      cover={
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl || "/default-product.jpg"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      }
      styles={{
        body: {
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        },
      }}
    >
      <TagCustom label={categoryName} color="green" />

      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-10 leading-tight">
        {name}
      </h3>

      <p className="text-gray-400 text-xs line-clamp-2 min-h-8">{description}</p>

      <div className="flex items-center justify-between">
        <span className="text-red-600 font-bold text-base">{formatPrice(price)}</span>
        <span className={`text-xs font-medium ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
          {stock > 0 ? `Còn ${stock}` : "Hết hàng"}
        </span>
      </div>

      {/* Quantity selector */}
      {stock > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 shrink-0">Số lượng:</span>
          <InputNumberCustom
            min={1}
            max={stock}
            value={quantity}
            onChange={(val) => setQuantity(val ?? 1)}
            size="small"
            className="w-20"
          />
        </div>
      )}

      <ButtonCustom
        type="primary"
        block
        disabled={stock === 0}
        loading={isAdding}
        size="small"
        onClick={handleAddToCart}
      >
        {stock > 0 ? "Thêm vào giỏ" : "Hết hàng"}
      </ButtonCustom>
    </CardCustom>
  );
}
