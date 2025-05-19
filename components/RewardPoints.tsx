"use client";

import { useEffect, useState } from "react";

interface PhanThuong {
  id: number;
  ma_khach_hang: number;
  diem: number;
  thoi_gian_tao: string;
}

export default function RewardPoints() {
  const [rewards, setRewards] = useState<PhanThuong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      const user = JSON.parse(localStorage.getItem("user") ?? "{}");
      if (!user || !user.userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/phanthuong/${user.userId}`);
        const data = await res.json();
        setRewards(data.lichSu || []);
      } catch (err) {
        console.error("Lỗi lấy điểm thưởng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  const tongDiem = rewards.reduce((sum, r) => sum + r.diem, 0);

  if (loading) return <p className="text-gray-400">Đang tải dữ liệu...</p>;
  if (!rewards.length) return <p className="text-gray-400">Chưa có điểm thưởng nào.</p>;

  return (
    <div className="space-y-4 text-left">
      {/* Tổng điểm thưởng */}
      <div className="bg-[#1d1b35] border border-[#37335e] p-4 rounded-lg shadow">
        <p className="text-white font-semibold text-lg mb-1">Tổng điểm thưởng:</p>
        <p className="text-red-400 text-3xl font-bold">{tongDiem}</p>
      </div>

      {/* Lịch sử điểm thưởng */}
      {rewards.map((reward) => (
        <div
          key={reward.id}
          className="bg-[#1d1b35] border border-[#37335e] p-4 rounded-lg shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">+{reward.diem} điểm</p>
              <p className="text-gray-400 text-sm">
                Ngày nhận: {new Date(reward.thoi_gian_tao).toLocaleString()}
              </p>
            </div>
            <span className="text-sm text-white-400">ID: {reward.id}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
