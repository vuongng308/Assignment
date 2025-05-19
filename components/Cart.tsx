"use client";

import { Product, Donhang } from "@/types";
import { useRouter } from "next/navigation";

interface CartProps {
  items?: { product: Product; quantity: number }[]; // cho items là optional
  onRemoveFromCart: (product: Product) => void;
  onIncreaseQuantity: (product: Product) => void;
  onDecreaseQuantity: (product: Product) => void;
}

export default function Cart({
  items = [], // mặc định mảng rỗng
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartProps) {
  const router = useRouter();

  // An toàn: kiểm tra items là mảng mới reduce
  const totalPrice = Array.isArray(items)
    ? items.reduce(
        (total, item) => total + item.product.gia * item.quantity,
        0
      )
    : 0;

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng");
      return;
    }

    const storedUsername = localStorage.getItem("currentUser");
    if (!storedUsername) {
      alert("Bạn cần đăng nhập để thanh toán");
      return;
    }

    const path = "http://localhost:3001/cart/username/" + storedUsername;
    const res = await fetch(path);
    const data = await res.json();

    let temp: Donhang = {
      userId: data,
      items: [],
    };

    items.forEach((item) => {
      temp.items.push({
        ma_mon_an: item.product.ma_mon_an,
        soLuong: item.quantity,
        donGia: item.product.gia,
      });
    });

    const addCart = async () => {
      const path = "http://localhost:3001/cart/" + temp.userId;
      await fetch(path, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(temp),
      });
    };

    await addCart();

    router.push("/payment-methods");
  };

  return (
    <div
      className={`fixed right-4 bottom-4 w-[320px] max-h-[80vh] p-4 bg-[#1d1b35] rounded-xl shadow-2xl text-white z-50 border border-[#37335e]`}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <img src="/images/shopping-cart.svg" alt="Cart" className="w-7 h-7" />
        Giỏ hàng
        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
          {items.length}
        </span>
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-400">Giỏ hàng trống</p>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pr-2 max-h-[60vh]">
            <ul className="space-y-3">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.ma_mon_an}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 w-[55%]">
                    <img
                      src={product.url_hinh_anh}
                      alt={product.ten_mon_an}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="truncate text-sm">{product.ten_mon_an}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-[#2a2746] rounded px-2 py-1">
                      <button
                        onClick={() => onDecreaseQuantity(product)}
                        className="text-orange-500 hover:text-orange-400"
                      >
                        -
                      </button>
                      <span className="mx-1">{quantity}</span>
                      <button
                        onClick={() => onIncreaseQuantity(product)}
                        className="text-orange-500 hover:text-orange-400"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(product)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-[#37335e]">
            <div className="flex justify-between mb-4 font-semibold">
              <span>Tổng cộng:</span>
              <span className="text-orange-500">
                {totalPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <button
              className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black rounded-lg hover:brightness-110 transition"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
