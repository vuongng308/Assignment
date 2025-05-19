"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

// ⭐️ Component đánh giá sao
const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (value: number) => void;
}) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-400"} transition-colors`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const [ratings, setRatings] = useState({
    service: 0,
    food: 0,
    ambiance: 0,
    overall: 0,
  });
  const [comment, setComment] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [userNavigated, setUserNavigated] = useState(false);

  const maDonHang = parseInt(params?.maDonHang as string);

  const getUserId = (): number | null => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.userId || null;
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async () => {
    const userId = getUserId();

    if (!userId) {
      alert("Không tìm thấy thông tin người dùng!");
      return;
    }

    if (!maDonHang || isNaN(maDonHang)) {
      alert("Không tìm thấy đơn hàng để đánh giá!");
      return;
    }

    if (Object.values(ratings).some((r) => r === 0)) {
      alert("Vui lòng đánh giá tất cả các mục!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/danhgia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ma_nguoi_dung: userId,
          ma_don_hang: maDonHang,
          diem_so: ratings.overall,
          danh_gia_chi_tiet: {
            service: ratings.service,
            food: ratings.food,
            ambiance: ratings.ambiance,
          },
          binh_luan: comment,
        }),
      });

      if (!response.ok) throw new Error("Gửi đánh giá thất bại!");

      const rewardResponse = await fetch("http://localhost:3001/phanthuong", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ma_khach_hang: userId,
          diem_thuong: 1,
        }),
      });

      if (!rewardResponse.ok) throw new Error("Gửi phần thưởng thất bại!");

      setShowSuccess(true);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };
  
  useEffect(() => {
    if (showSuccess && !userNavigated) {
      const timeout = setTimeout(() => {
        router.push("/home");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showSuccess, userNavigated]);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f0f0f, #1a1a2e, #3b3b58)" }}>
      {/* Header */}
      <header className="bg-[#1d1b35] p-4 fixed w-full top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push("/home")}
          >
            <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-orange-500 font-bold">Trang chủ</span>
          </div>
          <h1 className="text-xl font-bold text-white flex-1 text-center">Đánh giá dịch vụ</h1>
        </div>
      </header>

      {/* Main */}
      <main className="pt-20 pb-8 px-4 max-w-2xl mx-auto">
        <div className="bg-[#1d1b35] rounded-xl p-6 border border-[#37335e]">
          <div className="space-y-8">
            {[
              { label: "Dịch vụ", key: "service" },
              { label: "Món ăn", key: "food" },
              { label: "Không gian quán", key: "ambiance" },
              { label: "Đánh giá chung", key: "overall" },
            ].map(({ label, key }) => (
              <div key={key} className="space-y-2">
                <h3 className="text-white font-medium">{label}</h3>
                <StarRating
                  rating={ratings[key as keyof typeof ratings]}
                  setRating={(value) => setRatings({ ...ratings, [key]: value })}
                />
              </div>
            ))}

            {/* Nhận xét */}
            <div className="space-y-2">
              <h3 className="text-white font-medium">Nhận xét của bạn</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 bg-[#2a2746] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                rows={4}
                placeholder="Hãy chia sẻ cảm nhận của bạn..."
              />
            </div>

            {/* Nút hoàn thành */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-lime-400 text-black rounded-lg font-bold hover:brightness-110 transition"
            >
              Hoàn thành đánh giá
            </button>
          </div>
        </div>

        {/* Popup thành công */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#1d1b35] rounded-xl p-6 max-w-md w-full mx-4 border border-[#37335e]">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Đánh giá thành công! 🎉</h2>
                <p className="text-gray-300 mb-2">Cảm ơn bạn đã chia sẻ đánh giá</p>
                <p className="text-green-400 font-medium mb-6">Bạn đã nhận 1 điểm thưởng vào tài khoản!</p>

                <div className="grid gap-3">
                  <button
                    onClick={() => {
                      setUserNavigated(true);
                      router.push("/home");
                    }}
                    className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black rounded-lg font-bold hover:brightness-110 transition"
                  >
                    Về trang chủ
                  </button>
                  <button
                    onClick={() => {
                      setUserNavigated(true);
                      router.push("/profile"); // hoặc "/rewardpoints" nếu đúng route
                    }}
                    className="w-full py-2 bg-[#2a2746] border border-[#37335e] text-white rounded-lg hover:bg-[#37335e] transition"
                  >
                    Xem điểm thưởng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
