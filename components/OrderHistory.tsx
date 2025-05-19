"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DonHang {
  maDonHang: number;
  createdAt: string;
  tongTien: number;
  trangThai: string;
  chiTietDonHang: ChiTietDonHang[];
}

interface ChiTietDonHang {
  tenMon: string;
  soLuong: number;
  donGia: number;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<DonHang[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user") ?? "{}");
      if (!user || !user.userId) return;

      try {
        const res = await fetch(`http://localhost:3001/orders/user/${user.userId}`);
        const data = await res.json();
        setOrders(data.donHangs);
      } catch (err) {
        console.error("Lỗi lấy lịch sử đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-gray-400">Đang tải dữ liệu...</p>;
  if (!orders.length) return <p className="text-gray-400">Không có đơn hàng nào.</p>;

  return (
    <div className="space-y-4 text-left">
      {orders.map((order) => (
        <div
          key={order.maDonHang}
          onClick={() => {
            if (order.trangThai === "Hoàn thành") {
              router.push(`/review/${order.maDonHang}`);
            }
          }}
          className={`bg-[#1d1b35] border border-[#37335e] p-4 rounded-lg shadow transition cursor-${order.trangThai === "Hoàn thành" ? "pointer hover:bg-[#2a264b]" : "default opacity-60"}`}
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-white font-semibold">Mã đơn: #{order.maDonHang}</p>
              <p className="text-gray-400 text-sm">Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-sm text-white">
                Trạng thái:{" "}
                <span
                  className={`capitalize ${
                    order.trangThai === "Hoàn thành"
                      ? "text-green-400"
                      : "text-orange-400"
                  }`}
                >
                  {order.trangThai}
                </span>
              </p>
            </div>
            <p className="text-red-400 font-bold">
              {order.tongTien.toLocaleString()}₫
            </p>
          </div>
          <div className="mt-2 space-y-1 text-sm text-gray-300">
            {order.chiTietDonHang.map((item, index) => (
              <div key={index}>
                {item.tenMon} × {item.soLuong} — {item.donGia.toLocaleString()}₫
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
