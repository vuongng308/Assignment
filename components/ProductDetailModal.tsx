"use client";

import { useState } from "react";
import { Product } from "@/types";

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-[#1d1b35] rounded-xl shadow-2xl p-6 max-w-xl w-full relative border border-[#37335e]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-orange-500 hover:text-orange-400 text-2xl transition-colors"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Hình ảnh sản phẩm */}
          <img
            src={product.url_hinh_anh}
            alt={product.ten_mon_an}
            className="w-full md:w-[200px] h-[200px] object-cover rounded-lg border-2 border-[#37335e]"
          />

          {/* Thông tin chi tiết sản phẩm */}
          <div className="flex flex-col justify-between flex-1 text-white">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.ten_mon_an}</h2>
              <p className="text-orange-500 font-bold text-xl mb-4">
                {product.gia.toLocaleString("vi-VN")}đ
              </p>

              <div className="text-sm text-gray-300 mb-4">
                <p className="mb-2">
                  <span className="font-medium text-orange-400">Thành phần:</span> Bột mì, trứng, sữa tươi, vani
                </p>
                <p>
                  <span className="font-medium text-orange-400">Giá trị dinh dưỡng:</span> 250 kcal, 8g đường, 3g chất béo
                </p>
              </div>
            </div>

            {/* Tăng/giảm số lượng và nút thêm giỏ hàng */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-[#2a2746] border border-[#37335e] flex items-center justify-center text-lg font-bold hover:bg-[#37335e] transition-colors text-orange-500"
                >
                  -
                </button>
                <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-[#2a2746] border border-[#37335e] flex items-center justify-center text-lg font-bold hover:bg-[#37335e] transition-colors text-orange-500"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black px-4 py-2 rounded-lg hover:brightness-110 transition text-lg font-bold"
              >
                <img
                  src="/images/cart.svg"
                  alt="Giỏ hàng"
                  className="w-6 h-6"
                />
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}