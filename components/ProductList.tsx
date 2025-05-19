"use client";

import { Product } from "@/types";
import { useState } from "react";
import ProductDetailModal from "@/components/ProductDetailModal";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void; // Sửa tên prop chuẩn
}

export default function ProductList({ // SỬA CHỖ NÀY
  products,
  onAddToCart,
}: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="mt-3 bg-[#1d1b35] rounded-xl p-4 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <div
            key={item.ma_mon_an}
            className="p-4 bg-[#2a2746] rounded-lg text-white hover:bg-[#37335e] transition-colors group"
          >
            <img
              src={item.url_hinh_anh}
              alt={item.ten_mon_an}
              className="w-full h-48 object-cover rounded-lg mb-3 cursor-pointer transform group-hover:scale-105 transition-transform"
              onClick={() => setSelectedProduct(item)}
            />
            <h3 className="font-bold mb-1 truncate">{item.ten_mon_an}</h3>
            <div className="flex items-center justify-between">
              <p className="text-orange-500 font-bold text-lg">
                {item.gia.toLocaleString("vi-VN")}đ
              </p>
              <button
                onClick={() => onAddToCart(item)}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black rounded-md hover:brightness-110 transition"
              >
                Thêm
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}