"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

const paymentOptions: PaymentMethod[] = [
  { id: "credit-card", name: "Thẻ tín dụng", icon: "/images/mastercard.png" },
  { id: "vnpay", name: "VNPAY", icon: "/images/vnpay.png" },
  { id: "momo", name: "MoMo", icon: "/images/momo.png" },
];

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Load orderId and amount from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("orderId");
    const storedAmount = localStorage.getItem("orderAmount");

    // Check if values exist in localStorage and are valid
    if (storedId && storedAmount) {
      const parsedId = Number(storedId);
      const parsedAmount = Number(storedAmount);

      if (!isNaN(parsedId) && !isNaN(parsedAmount)) {
        setOrderId(parsedId);
        setAmount(parsedAmount);
      } else {
        console.error("Invalid order data in localStorage");
      }
    } else {
      console.error("No order data found in localStorage");
    }
  }, []);

  // Handle payment confirmation
  const handleConfirmPayment = async () => {
    if (!orderId || !amount || !selectedMethod) {
      alert("Vui lòng chọn phương thức và đảm bảo có đơn hàng.");
      return;
    }

    const payload = {
      ma_don_hang: orderId,
      phuong_thuc_thanh_toan: selectedMethod,
      so_tien: amount,
      thanh_cong: true,
      thoi_gian_thanh_toan: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3001/thanh-toan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Lỗi thanh toán:", errorText);
        throw new Error("Thanh toán thất bại");
      }

      setShowSuccessPopup(true);
    } catch (err) {
      console.error("Lỗi gửi thanh toán:", err);
      alert("Gửi thanh toán thất bại.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <header className="bg-[#1d1b35] p-4 fixed w-full top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push("/home")}
          >
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="text-orange-500 font-bold">Trang chủ</span>
          </div>
          <h1 className="text-xl font-bold text-white flex-1 text-center">
            Phương thức thanh toán
          </h1>
        </div>
      </header>

      {/* Nội dung chính */}
      <main className="pt-20 pb-24 px-4 max-w-2xl mx-auto">
        <div className="space-y-4">
          {[
            { 
              name: "Thẻ tín dụng", 
              icon: "/images/mastercard.png",
              id: "credit-card"
            },
            { 
              name: "VNPAY", 
              icon: "/images/vnpay.png",
              id: "vnpay"
            },
            { 
              name: "MoMo", 
              icon: "/images/momo.png",
              id: "momo"
            }
          ].map((method) => (
            <button 
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 rounded-lg transition-all duration-200 flex justify-between items-center
                ${
                  selectedMethod === method.id 
                    ? "bg-gradient-to-r from-orange-500 to-yellow-400 text-black"
                    : "bg-[#2a2746] text-white hover:bg-[#37335e]"
                }`}
            >
              <span>{method.name}</span>
              <img
                src={method.icon}
                alt={method.name}
                className="w-12 h-8 object-contain"
              />
            </button>
          ))}
        </div>

        {/* Popup thông báo thành công */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#1d1b35] rounded-xl p-6 max-w-md w-full mx-4 border border-[#37335e]">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Thanh toán thành công! 🎉
                </h2>
                <p className="text-gray-300 mb-6">
                  Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
                </p>

                <div className="grid gap-3">
                  <button
                    onClick={() => router.push("/home")}
                    className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black rounded-lg font-bold hover:brightness-110 transition"
                  >
                    Tiếp tục đặt món
                  </button>
                  <button
                    onClick={() => router.push("/review")}
                    className="w-full py-2 bg-[#2a2746] border border-[#37335e] text-white rounded-lg hover:bg-[#37335e] transition"
                  >
                    Đánh giá để nhận thưởng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nhóm nút hành động gốc */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => router.back()}
            className="py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirmPayment}
            className="py-3 bg-gradient-to-r from-green-500 to-lime-400 text-black rounded-lg hover:brightness-110 transition"
          >
            Xác nhận
          </button>
        </div>
      </main>
    </div>
  );
}
